<?php
require_once __DIR__ . '/auth_lib.php';
require_role(['root']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed');
}

$username = sanitize_username($_POST['username'] ?? '');
if ($username === '') {
    respond(false, 'Username wajib.');
}

$current = current_user();
if (strcasecmp($current['username'], $username) === 0) {
    respond(false, 'Tidak boleh menghapus akun sendiri.');
}

$users = load_users();
// Jangan izinkan penghapusan akun role root melalui web
foreach ($users as $u) {
    if ($u['role'] === 'root' && strcasecmp($u['username'], $username) === 0) {
        respond(false, 'Akun root tidak boleh dihapus melalui web.');
    }
}

if (is_only_root($users, $username)) {
    respond(false, 'Tidak boleh menghapus root terakhir.');
}

$found = false;
foreach ($users as $idx => $u) {
    if (strcasecmp($u['username'], $username) === 0) {
        unset($users[$idx]);
        $found = true;
        break;
    }
}

if (!$found) {
    respond(false, 'User tidak ditemukan.');
}

if (!save_users($users)) {
    respond(false, 'Gagal menghapus user.');
}

respond(true, 'User dihapus.', ['username' => $username]);
