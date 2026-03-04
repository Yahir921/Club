<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $stmt = db()->query('SELECT id, title, event_date, place, details, image_url, created_at, updated_at FROM events ORDER BY event_date ASC, id ASC');
    $rows = $stmt->fetchAll();

    json_response([
        'ok' => true,
        'events' => array_map(static function (array $row): array {
            return [
                'id' => (int)$row['id'],
                'title' => (string)$row['title'],
                'date' => (string)$row['event_date'],
                'place' => (string)$row['place'],
                'details' => (string)$row['details'],
                'image' => (string)$row['image_url'],
                'createdAt' => (string)$row['created_at'],
                'updatedAt' => (string)$row['updated_at'],
            ];
        }, $rows),
    ]);
}

require_admin();

$body = request_body();

if ($method === 'POST') {
    $title = trim((string)($body['title'] ?? ''));
    $date = trim((string)($body['date'] ?? ''));
    $place = trim((string)($body['place'] ?? ''));
    $details = trim((string)($body['details'] ?? ''));
    $image = trim((string)($body['image'] ?? ''));

    if ($title === '' || $date === '' || $place === '' || $details === '') {
        json_response(['ok' => false, 'message' => 'Campos obligatorios incompletos'], 422);
    }

    if ($image === '') {
        $image = '/icono-red-toluca.png';
    }

    $stmt = db()->prepare(
        'INSERT INTO events (title, event_date, place, details, image_url) VALUES (:title, :event_date, :place, :details, :image_url)'
    );
    $stmt->execute([
        'title' => $title,
        'event_date' => $date,
        'place' => $place,
        'details' => $details,
        'image_url' => $image,
    ]);

    json_response(['ok' => true, 'id' => (int)db()->lastInsertId()], 201);
}

if ($method === 'PUT') {
    $id = (int)($body['id'] ?? 0);
    $title = trim((string)($body['title'] ?? ''));
    $date = trim((string)($body['date'] ?? ''));
    $place = trim((string)($body['place'] ?? ''));
    $details = trim((string)($body['details'] ?? ''));
    $image = trim((string)($body['image'] ?? ''));

    if ($id <= 0 || $title === '' || $date === '' || $place === '' || $details === '') {
        json_response(['ok' => false, 'message' => 'Datos invalidos para actualizar'], 422);
    }

    if ($image === '') {
        $image = '/icono-red-toluca.png';
    }

    $stmt = db()->prepare(
        'UPDATE events SET title = :title, event_date = :event_date, place = :place, details = :details, image_url = :image_url WHERE id = :id'
    );
    $stmt->execute([
        'id' => $id,
        'title' => $title,
        'event_date' => $date,
        'place' => $place,
        'details' => $details,
        'image_url' => $image,
    ]);

    json_response(['ok' => true]);
}

if ($method === 'DELETE') {
    $id = (int)($body['id'] ?? 0);
    if ($id <= 0) {
        json_response(['ok' => false, 'message' => 'ID invalido'], 422);
    }

    $stmt = db()->prepare('DELETE FROM events WHERE id = :id');
    $stmt->execute(['id' => $id]);
    json_response(['ok' => true]);
}

json_response(['ok' => false, 'message' => 'Metodo no permitido'], 405);

