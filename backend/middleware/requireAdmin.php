<?php
require_once __DIR__ . '/requireAuth.php';

function requireAdmin() {
    $token = requireAuth();

    // Replace with real token role check
    if ($token !== 'admin-jwt-token') {
        jsonResponse(['message' => 'Admin only'], 403);
    }

    return true;
}