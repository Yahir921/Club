<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

function allow_cors_if_needed(): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ];

    if ($origin !== '' && in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
        header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
    }
}

allow_cors_if_needed();

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

session_name(SESSION_NAME);
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Lax',
]);
session_start();

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function request_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function is_admin_logged_in(): bool
{
    return isset($_SESSION['admin_id']) && is_int($_SESSION['admin_id']);
}

function require_admin(): void
{
    if (!is_admin_logged_in()) {
        json_response(['ok' => false, 'message' => 'No autorizado'], 401);
    }
}

function csrf_token(): string
{
    if (!isset($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token']) || $_SESSION['csrf_token'] === '') {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function require_csrf_token(): void
{
    $headerToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $bodyToken = '';

    if ($headerToken === '') {
        $body = request_body();
        $bodyToken = (string)($body['csrfToken'] ?? '');
    }

    $token = $headerToken !== '' ? $headerToken : $bodyToken;
    $sessionToken = (string)($_SESSION['csrf_token'] ?? '');

    if ($token === '' || $sessionToken === '' || !hash_equals($sessionToken, $token)) {
        json_response(['ok' => false, 'message' => 'Token CSRF invalido'], 419);
    }
}

function client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        $parts = explode(',', $forwarded);
        $candidate = trim((string)$parts[0]);
        if ($candidate !== '') {
            return $candidate;
        }
    }

    $remote = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return is_string($remote) && $remote !== '' ? $remote : 'unknown';
}

function rate_limit_key(string $scope, string $identity = ''): string
{
    $normalizedIdentity = strtolower(trim($identity));
    $base = $scope . '|' . client_ip() . '|' . $normalizedIdentity;
    return hash('sha256', $base);
}

function rate_limit_file(string $key): string
{
    return rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'toluca_rl_' . $key . '.json';
}

function rate_limit_data(string $key): array
{
    $file = rate_limit_file($key);
    if (!is_file($file)) {
        return [];
    }

    $raw = file_get_contents($file);
    if (!is_string($raw) || $raw === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function rate_limit_save(string $key, array $timestamps): void
{
    $file = rate_limit_file($key);
    @file_put_contents($file, json_encode(array_values($timestamps), JSON_UNESCAPED_UNICODE));
}

function rate_limit_filter_recent(array $timestamps, int $windowSeconds): array
{
    $threshold = time() - $windowSeconds;
    return array_values(array_filter($timestamps, static function ($ts) use ($threshold): bool {
        return is_int($ts) && $ts >= $threshold;
    }));
}

function rate_limit_check(string $scope, string $identity, int $maxAttempts, int $windowSeconds): array
{
    $key = rate_limit_key($scope, $identity);
    $timestamps = rate_limit_filter_recent(rate_limit_data($key), $windowSeconds);
    $remaining = $maxAttempts - count($timestamps);
    $allowed = $remaining > 0;
    $retryAfter = 0;

    if (!$allowed && count($timestamps) > 0) {
        $oldest = (int)$timestamps[0];
        $retryAfter = max(1, $windowSeconds - (time() - $oldest));
    }

    rate_limit_save($key, $timestamps);

    return [
        'allowed' => $allowed,
        'remaining' => max(0, $remaining),
        'retry_after' => $retryAfter,
    ];
}

function rate_limit_hit(string $scope, string $identity, int $maxAttempts, int $windowSeconds): array
{
    $key = rate_limit_key($scope, $identity);
    $timestamps = rate_limit_filter_recent(rate_limit_data($key), $windowSeconds);
    $timestamps[] = time();
    rate_limit_save($key, $timestamps);
    return rate_limit_check($scope, $identity, $maxAttempts, $windowSeconds);
}

function rate_limit_clear(string $scope, string $identity): void
{
    $file = rate_limit_file(rate_limit_key($scope, $identity));
    if (is_file($file)) {
        @unlink($file);
    }
}
