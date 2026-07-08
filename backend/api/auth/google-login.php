<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../helpers/response.php';

$input = json_decode(file_get_contents('php://input'), true);
$idToken = $input['idToken'] ?? '';

if (!$idToken) {
    jsonResponse(['message' => 'Missing Google token'], 400);
}

// यहां Google token verify logic add hoga
// अभी demo response
$user = [
    'id' => 1,
    'name' => 'Student',
    'email' => 'student@example.com',
    'role' => 'student',
    'token' => 'jwt-token-here'
];

jsonResponse(['user' => $user]);
