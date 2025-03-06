<?php
// Set your Discord webhook URL
$webhookURL = 'https://discord.com/api/webhooks/1137796062044749894/ugJ72eN5li6jbb2PwFBFIqB4akfyJtuqNFru6rWAbCx0GsiMjMXZoDmNK6GYJZB7Raag';

// Get raw POST data sent from Roblox
$inputData = file_get_contents("php://input");

// Prepare the payload for Discord
$payload = json_encode([
    "content" => $inputData,  // Directly relaying raw data
]);

// Initialize cURL session
$ch = curl_init($webhookURL);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($payload)
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

// Execute the cURL request and capture the response
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    echo 'Success';
}

// Close cURL session
curl_close($ch);
?>