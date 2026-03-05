<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    json_response([
        'ok' => true,
        'authenticated' => is_admin_logged_in(),
        'csrfToken' => csrf_token(),
    ]);
}

if ($method !== 'POST') {
    json_response(['ok' => false, 'message' => 'Metodo no permitido'], 405);
}

$body = request_body();
$action = (string)($body['action'] ?? 'login');

require_csrf_token();

if ($action === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool)$params['secure'], (bool)$params['httponly']);
    }
    session_destroy();
    json_response(['ok' => true]);
}

$username = trim((string)($body['username'] ?? ''));
$password = (string)($body['password'] ?? '');
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_SECONDS = 300;

$limitState = rate_limit_check('admin_login', $username, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS);
if (!$limitState['allowed']) {
    json_response([
        'ok' => false,
        'message' => 'Demasiados intentos. Intenta de nuevo en ' . (int)$limitState['retry_after'] . ' segundos.',
    ], 429);
}

if ($username === '' || $password === '') {
    json_response(['ok' => false, 'message' => 'Usuario y contrasena requeridos'], 422);
}

$stmt = db()->prepare('SELECT id, username, password_hash FROM admins WHERE username = :username LIMIT 1');
$stmt->execute(['username' => $username]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, (string)$admin['password_hash'])) {
    $failedState = rate_limit_hit('admin_login', $username, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_SECONDS);
    if (!$failedState['allowed']) {
        json_response([
            'ok' => false,
            'message' => 'Demasiados intentos. Intenta de nuevo en ' . (int)$failedState['retry_after'] . ' segundos.',
        ], 429);
    }
    json_response(['ok' => false, 'message' => 'Credenciales invalidas'], 401);
}

rate_limit_clear('admin_login', $username);
session_regenerate_id(true);
$_SESSION['admin_id'] = (int)$admin['id'];
$_SESSION['admin_user'] = (string)$admin['username'];
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));

json_response([
    'ok' => true,
    'authenticated' => true,
    'username' => (string)$admin['username'],
    'csrfToken' => csrf_token(),
]);
