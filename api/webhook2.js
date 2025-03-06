const http = require('http');
const fetch = require('node-fetch'); // Ensure node-fetch is installed

const webhookURL = 'https://discord.com/api/webhooks/1137796062044749894/ugJ72eN5li6jbb2PwFBFIqB4akfyJtuqNFru6rWAbCx0GsiMjMXZoDmNK6GYJZB7Raag';

// Create an HTTP server
const server = http.createServer((req, res) => {
    let inputData = '';

    // Listen for data chunks
    req.on('data', chunk => {
        inputData += chunk;
    });

    // When the data is fully received
    req.on('end', () => {
        // Send the data to Discord
        sendToDiscord(inputData);

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Data received and sent to Discord');
    });

    // Handle errors
    req.on('error', (err) => {
        console.error('Error receiving data:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error receiving data');
    });
});

// Function to send the data to Discord
async function sendToDiscord(inputData) {
    const payload = JSON.stringify({
        content: inputData,  // Directly relaying raw data
    });

    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length.toString(),
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error('Failed to send webhook');
        }
        console.log('Success');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
