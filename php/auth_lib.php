<?php
session_start();

const USERS_FILE = __DIR__ . '/../data/users.json';
const DEFAULT_ROOT_USER = 'root';
const DEFAULT_ROOT_PASS = 'changeme';

function respond($ok, $message, $data = []) {
    header('Content-Type: application/json');
    echo json_encode(array_merge(['success' => $ok, 'message' => $message], $data));
    exit;
}

function ensure_users_file() {
    if (!file_exists(USERS_FILE)) {
        bootstrap_users();
    } else {
        $json = file_get_contents(USERS_FILE);
        $data = json_decode($json, true);
        if (!is_array($data) || count($data) === 0) {
            bootstrap_users();
        }
    }
}

function bootstrap_users() {
    $user = [
        'username' => DEFAULT_ROOT_USER,
        'role' => 'root',
        'password' => password_hash(DEFAULT_ROOT_PASS, PASSWORD_DEFAULT)
    ];
    if (!is_dir(dirname(USERS_FILE))) {
        mkdir(dirname(USERS_FILE), 0775, true);
    }
    file_put_contents(USERS_FILE, json_encode([$user], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function load_users() {
    ensure_users_file();
    $json = file_get_contents(USERS_FILE);
    $data = json_decode($json, true);
    return is_array($data) ? $data : [];
}

function save_users($users) {
    if (!is_array($users)) {
        return false;
    }
    return file_put_contents(USERS_FILE, json_encode(array_values($users), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
}

function find_user($users, $username) {
    foreach ($users as $u) {
        if (strcasecmp($u['username'], $username) === 0) {
            return $u;
        }
    }
    return null;
}

function require_login() {
    if (!isset($_SESSION['user'])) {
        respond(false, 'Unauthenticated');
    }
}

function require_role($roles = []) {
    require_login();
    $user = $_SESSION['user'];
    if (!in_array($user['role'], $roles, true)) {
        respond(false, 'Forbidden');
    }
}

function current_user() {
    return $_SESSION['user'] ?? null;
}

function sanitize_username($u) {
    $u = trim($u);
    $u = preg_replace('/[^a-zA-Z0-9_-]/', '', $u);
    return $u;
}

function is_only_root($users, $username) {
    $rootCount = 0;
    foreach ($users as $u) {
        if ($u['role'] === 'root') {
            $rootCount++;
        }
    }
    if ($rootCount <= 1) {
        // Only one root exists
        foreach ($users as $u) {
            if ($u['role'] === 'root' && strcasecmp($u['username'], $username) === 0) {
                return true;
            }
        }
    }
    return false;
}

?>
