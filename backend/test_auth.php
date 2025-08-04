<?php

require_once 'vendor/autoload.php';

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Testing Authentication Endpoints\n";
echo "===============================\n\n";

// Test 1: Register a new user
echo "1. Testing Registration...\n";
$request = Request::create('/api/register', 'POST', [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => 'password123',
    'password_confirmation' => 'password123'
], [], [], [
    'HTTP_ACCEPT' => 'application/json',
    'HTTP_CONTENT_TYPE' => 'application/json'
]);

$response = app()->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Response: " . $response->getContent() . "\n\n";

// Test 2: Login with the user
echo "2. Testing Login...\n";
$request = Request::create('/api/login', 'POST', [
    'email' => 'test@example.com',
    'password' => 'password123'
], [], [], [
    'HTTP_ACCEPT' => 'application/json',
    'HTTP_CONTENT_TYPE' => 'application/json'
]);

$response = app()->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Response: " . $response->getContent() . "\n\n";

// Test 3: Get current user (if login was successful)
$responseData = json_decode($response->getContent(), true);
if (isset($responseData['access_token'])) {
    echo "3. Testing /me endpoint...\n";
    $request = Request::create('/api/me', 'GET', [], [], [], [
        'HTTP_ACCEPT' => 'application/json',
        'HTTP_AUTHORIZATION' => 'Bearer ' . $responseData['access_token']
    ]);

    $response = app()->handle($request);
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Response: " . $response->getContent() . "\n\n";
}

echo "Test completed!\n"; 