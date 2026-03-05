<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    json_response(['ok' => false, 'message' => 'Metodo no permitido'], 405);
}

require_admin();
require_csrf_token();

if (!isset($_FILES['photo'])) {
    json_response(['ok' => false, 'message' => 'No se envio archivo'], 422);
}

$file = $_FILES['photo'];
if (!is_array($file) || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(['ok' => false, 'message' => 'Error al subir archivo'], 422);
}

$tmpPath = (string)$file['tmp_name'];
$size = (int)$file['size'];
$originalName = (string)$file['name'];

if ($size <= 0 || $size > 5 * 1024 * 1024) {
    json_response(['ok' => false, 'message' => 'Tamano invalido. Maximo 5MB'], 422);
}

$allowedExt = ['jpg', 'jpeg', 'png', 'webp'];
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
if (!in_array($ext, $allowedExt, true)) {
    json_response(['ok' => false, 'message' => 'Formato no permitido'], 422);
}

$projectRoot = dirname(__DIR__);
$uploadCandidates = [
    ['dir' => $projectRoot . '/eventos', 'urlPrefix' => '/eventos'],
    ['dir' => $projectRoot . '/public/eventos', 'urlPrefix' => '/public/eventos'],
];

$selected = null;
foreach ($uploadCandidates as $candidate) {
    $candidateDir = (string)$candidate['dir'];
    if (!is_dir($candidateDir) && !mkdir($candidateDir, 0775, true) && !is_dir($candidateDir)) {
        continue;
    }

    if (is_dir($candidateDir) && is_writable($candidateDir)) {
        $selected = $candidate;
        break;
    }
}

if (!is_array($selected)) {
    json_response(['ok' => false, 'message' => 'No se pudo crear carpeta de subida'], 500);
}

$fileName = 'evento_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$targetPath = (string)$selected['dir'] . '/' . $fileName;

if (!move_uploaded_file($tmpPath, $targetPath)) {
    json_response(['ok' => false, 'message' => 'No se pudo guardar el archivo'], 500);
}

$scriptName = str_replace('\\', '/', (string)($_SERVER['SCRIPT_NAME'] ?? '/api/upload.php'));
$basePath = preg_replace('#/api/[^/]+$#', '', $scriptName);
$basePath = rtrim((string)$basePath, '/');
$relativeUrl = ($basePath === '' ? '' : $basePath) . (string)$selected['urlPrefix'] . '/' . $fileName;

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = (string)($_SERVER['HTTP_HOST'] ?? '');
$publicUrl = $host !== '' ? $scheme . '://' . $host . $relativeUrl : $relativeUrl;

json_response([
    'ok' => true,
    'url' => $publicUrl,
]);
