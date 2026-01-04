<?php
require_once __DIR__ . '/auth_lib.php';
require_role(['root']);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed');
}

$username = sanitize_username($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? 'admin';

if ($username === '' || $password === '') {
    respond(false, 'Username dan password wajib.');
}

if (!in_array($role, ['root', 'admin'], true)) {
    respond(false, 'Role tidak valid.');
}

$users = load_users();
$existingIndex = null;
foreach ($users as $idx => $u) {
    if (strcasecmp($u['username'], $username) === 0) {
        $existingIndex = $idx;
        break;
    }
}

$newUser = [
    'username' => $username,
    'role' => $role,
    'password' => password_hash($password, PASSWORD_DEFAULT)
];

if ($existingIndex !== null) {
    $users[$existingIndex] = $newUser;
} else {
    $users[] = $newUser;
}

if (!save_users($users)) {
    respond(false, 'Gagal menyimpan user.');
}

respond(true, 'User tersimpan.', ['username' => $username, 'role' => $role]);
