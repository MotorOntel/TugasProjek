<?php
require_once __DIR__ . '/auth_lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed');
}

$username = sanitize_username($_POST['username'] ?? '');
$password = $_POST['password'] ?? '';

if ($username === '' || $password === '') {
    respond(false, 'Username dan password wajib.');
}

$users = load_users();
$user = find_user($users, $username);

if (!$user || !password_verify($password, $user['password'])) {
    respond(false, 'Username atau password salah.');
}

// Set session
$_SESSION['user'] = [
    'username' => $user['username'],
    'role' => $user['role']
];

respond(true, 'Login berhasil', ['role' => $user['role']]);
