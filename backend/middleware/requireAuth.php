<?php
require_once __DIR__ . '/../helpers/response.php';

function requireAuth() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!$auth || !str_starts_with($auth, 'Bearer ')) {
        jsonResponse(['message' => 'Unauthorized'], 401);
    }

    $token = trim(str_replace('Bearer ', '', $auth));
    if (!$token) {
        jsonResponse(['message' => 'Unauthorized'], 401);
    }

    return $token;
}