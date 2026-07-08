<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';

$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if ($username === 'admin' && $password === 'admin123') {
    jsonResponse([
        'user' => [
            'id' => 1,
            'name' => 'Master Admin',
            'role' => 'admin',
            'token' => 'admin-jwt-token'
        ]
    ]);
}

jsonResponse(['message' => 'Invalid credentials'], 401);