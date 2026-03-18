<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

const HOME_GALLERY_DEFAULTS = [
    1 => '/galeria/Imagen 1.jpeg',
    2 => '/galeria/Imagen 2.jpeg',
    3 => '/galeria/Imagen 3.jpeg',
];

function ensure_home_gallery_schema(): void
{
    db()->exec(
        'CREATE TABLE IF NOT EXISTS home_gallery (
            slot TINYINT UNSIGNED PRIMARY KEY,
            image_url VARCHAR(255) NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
    );

    $insert = db()->prepare('INSERT IGNORE INTO home_gallery (slot, image_url) VALUES (:slot, :image_url)');
    foreach (HOME_GALLERY_DEFAULTS as $slot => $imageUrl) {
        $insert->execute([
            'slot' => $slot,
            'image_url' => $imageUrl,
        ]);
    }
}

function load_home_gallery(): array
{
    $stmt = db()->query('SELECT slot, image_url, updated_at FROM home_gallery ORDER BY slot ASC');
    $rows = $stmt->fetchAll();

    return array_map(static function (array $row): array {
        return [
            'slot' => (int)$row['slot'],
            'image' => (string)$row['image_url'],
            'updatedAt' => (string)$row['updated_at'],
        ];
    }, $rows);
}

ensure_home_gallery_schema();

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    json_response([
        'ok' => true,
        'images' => load_home_gallery(),
    ]);
}

require_admin();
require_csrf_token();

$body = request_body();

if ($method === 'PUT') {
    $slot = (int)($body['slot'] ?? 0);
    $image = trim((string)($body['image'] ?? ''));

    if ($slot < 1 || $slot > 3 || $image === '') {
        json_response(['ok' => false, 'message' => 'Datos invalidos para actualizar galeria'], 422);
    }

    $stmt = db()->prepare('UPDATE home_gallery SET image_url = :image_url WHERE slot = :slot');
    $stmt->execute([
        'slot' => $slot,
        'image_url' => $image,
    ]);

    json_response([
        'ok' => true,
        'images' => load_home_gallery(),
    ]);
}

json_response(['ok' => false, 'message' => 'Metodo no permitido'], 405);
