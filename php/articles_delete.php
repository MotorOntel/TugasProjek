<?php
require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed');
}

require_role(['admin', 'root']);

$slug = trim($_POST['slug'] ?? '');
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

$found = false;
foreach ($articles as $idx => $a) {
    if ($a['slug'] === $slug) {
        unset($articles[$idx]);
        $found = true;
        break;
    }
}

if (!$found) {
    respond(false, 'Artikel tidak ditemukan.');
}

if (file_put_contents($dataFile, json_encode(array_values($articles), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
    respond(false, 'Gagal menghapus artikel.');
}

respond(true, 'Artikel dihapus.', ['slug' => $slug]);
