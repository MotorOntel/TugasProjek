<?php
require_once __DIR__ . '/auth_lib.php';

$user = current_user();
if (!$user) {
    respond(false, 'Unauthenticated');
}

respond(true, 'OK', ['user' => $user]);
