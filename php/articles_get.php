<?php
require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respond(false, 'Method not allowed');
}

require_role(['admin', 'root']);

$slug = $_GET['slug'] ?? '';
if ($slug === '') {
    respond(false, 'Slug wajib.');
}

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/articles.json';

if (!file_exists($dataFile)) {
    respond(false, 'Artikel tidak ditemukan.');
}

$json = file_get_contents($dataFile);
$articles = json_decode($json, true);
if (!is_array($articles)) {
    respond(false, 'Data artikel invalid.');
}

$found = null;
foreach ($articles as $a) {
    if ($a['slug'] === $slug) {
        $found = $a;
        break;
    }
}

if (!$found) {
    respond(false, 'Artikel tidak ditemukan.');
}

respond(true, 'OK', ['article' => $found]);
