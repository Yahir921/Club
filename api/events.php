<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
const PLACE_URL_SEPARATOR = '||URL||';

function pack_place(string $name, string $url): string
{
    if ($url === '') {
        return $name;
    }

    return $name . PLACE_URL_SEPARATOR . $url;
}

function unpack_place(string $value): array
{
    $parts = explode(PLACE_URL_SEPARATOR, $value, 2);
    if (count($parts) !== 2) {
        return ['name' => $value, 'url' => ''];
    }

    return [
        'name' => trim((string)$parts[0]),
        'url' => trim((string)$parts[1]),
    ];
}

if ($method === 'GET') {
    $stmt = db()->query('SELECT id, title, event_date, place, details, image_url, created_at, updated_at FROM events ORDER BY event_date ASC, id ASC');
    $rows = $stmt->fetchAll();

    json_response([
        'ok' => true,
        'events' => array_map(static function (array $row): array {
            $placeData = unpack_place((string)$row['place']);
            return [
                'id' => (int)$row['id'],
                'title' => (string)$row['title'],
                'date' => (string)$row['event_date'],
                'time' => (string)$row['details'],
                'place' => (string)$placeData['name'],
                'placeUrl' => (string)$placeData['url'],
                'details' => (string)$row['details'],
                'image' => (string)$row['image_url'],
                'createdAt' => (string)$row['created_at'],
                'updatedAt' => (string)$row['updated_at'],
            ];
        }, $rows),
    ]);
}

require_admin();
require_csrf_token();

$body = request_body();

if ($method === 'POST') {
    $title = trim((string)($body['title'] ?? ''));
    $date = trim((string)($body['date'] ?? ''));
    $time = trim((string)($body['time'] ?? ''));
    $place = trim((string)($body['place'] ?? ''));
    $placeUrl = trim((string)($body['placeUrl'] ?? ''));
    $image = trim((string)($body['image'] ?? ''));

    if ($title === '' || $date === '' || $time === '' || $place === '') {
        json_response(['ok' => false, 'message' => 'Campos obligatorios incompletos'], 422);
    }

    if ($placeUrl !== '' && filter_var($placeUrl, FILTER_VALIDATE_URL) === false) {
        json_response(['ok' => false, 'message' => 'URL de lugar invalida'], 422);
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
        'place' => pack_place($place, $placeUrl),
        'details' => $time,
        'image_url' => $image,
    ]);

    json_response(['ok' => true, 'id' => (int)db()->lastInsertId()], 201);
}

if ($method === 'PUT') {
    $id = (int)($body['id'] ?? 0);
    $title = trim((string)($body['title'] ?? ''));
    $date = trim((string)($body['date'] ?? ''));
    $time = trim((string)($body['time'] ?? ''));
    $place = trim((string)($body['place'] ?? ''));
    $placeUrl = trim((string)($body['placeUrl'] ?? ''));
    $image = trim((string)($body['image'] ?? ''));

    if ($id <= 0 || $title === '' || $date === '' || $time === '' || $place === '') {
        json_response(['ok' => false, 'message' => 'Datos invalidos para actualizar'], 422);
    }

    if ($placeUrl !== '' && filter_var($placeUrl, FILTER_VALIDATE_URL) === false) {
        json_response(['ok' => false, 'message' => 'URL de lugar invalida'], 422);
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
        'place' => pack_place($place, $placeUrl),
        'details' => $time,
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
