<?php
require_once __DIR__ . '/../../helpers/response.php';

$input = json_decode(file_get_contents('php://input'), true);

jsonResponse([
    'message' => 'Live class created successfully',
    'data' => $input
]);