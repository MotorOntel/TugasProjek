<?php
require_once __DIR__ . '/auth_lib.php';
require_role(['root']);

$users = load_users();
$out = array_map(function($u) {
    return [
        'username' => $u['username'],
        'role' => $u['role']
    ];
}, $users);
respond(true, 'OK', ['users' => $out]);
