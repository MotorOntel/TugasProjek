<?php
require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed');
}

require_role(['admin', 'root']);

function sanitize_slug($text) {
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9-]+/', '-', $text);
    $text = trim($text, '-');
    return $text ?: 'artikel-' . uniqid();
}

function sanitize_content($html) {
    $allowed = '<p><br><strong><em><ul><ol><li><a><h1><h2><h3><h4><blockquote><code><pre>';
    return strip_tags($html, $allowed);
}

$title   = trim($_POST['title'] ?? '');
$slug    = trim($_POST['slug'] ?? '');
$summary = trim($_POST['summary'] ?? '');
$hero    = trim($_POST['hero'] ?? '');
$tagsRaw = trim($_POST['tags'] ?? '');
$content = trim($_POST['content'] ?? '');
$oldSlug = trim($_POST['oldSlug'] ?? '');

if ($title === '' || $summary === '' || $content === '') {
    respond(false, 'Judul, ringkasan, dan konten wajib diisi.');
}

$slug = sanitize_slug($slug !== '' ? $slug : $title);
$contentSafe = sanitize_content($content);
$tags = array_values(array_filter(array_map('trim', explode(',', $tagsRaw))));

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/articles.json';

if (!is_dir($dataDir)) {
    if (!mkdir($dataDir, 0775, true)) {
        respond(false, 'Gagal membuat folder data.');
    }
}

$articles = [];
if (file_exists($dataFile)) {
    $json = file_get_contents($dataFile);
    $articles = json_decode($json, true);
    if (!is_array($articles)) {
        $articles = [];
    }
}

$article = [
    'id' => uniqid('art_'),
    'title' => $title,
    'slug' => $slug,
    'summary' => $summary,
    'content' => $contentSafe,
    'hero' => $hero,
    'tags' => $tags,
    'created_at' => date('c')
];

if ($oldSlug !== '') {
    // Update mode: find and replace existing article
    $found = false;
    foreach ($articles as $idx => $a) {
        if ($a['slug'] === $oldSlug) {
            $article['id'] = $a['id'];
            $article['created_at'] = $a['created_at'];
            $articles[$idx] = $article;
            $found = true;
            break;
        }
    }
    if (!$found) {
        respond(false, 'Artikel lama tidak ditemukan.');
    }
} else {
    // Create mode: prepend new article
    array_unshift($articles, $article);
}

if (file_put_contents($dataFile, json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) === false) {
    respond(false, 'Gagal menyimpan artikel.');
}

respond(true, 'Artikel tersimpan.', ['slug' => $slug]);
?>
    if (!is_array($articles)) {
