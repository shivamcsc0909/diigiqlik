<?php
function generateToken($payload) {
    return base64_encode(json_encode($payload) . "|" . time());
}

function verifyToken($token) {
    $decoded = base64_decode($token, true);
    if (!$decoded) return false;
    return true;
}