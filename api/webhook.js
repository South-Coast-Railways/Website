const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importing the CORS middleware
const app = express();
const PORT = process.env.PORT || 3000;

// Set your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1137796062044749894/ugJ72eN5li6jbb2PwFBFIqB4akfyJtuqNFru6rWAbCx0GsiMjMXZoDmNK6GYJZB7Raag';

// Middleware to parse raw JSON body
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors()); // This allows cross-origin requests

// Handle POST requests to the root
app.post('/', async (req, res) => {
    console.log(`Received a POST request with data: ${JSON.stringify(req.body)}`);
    
    try {
        // Send the received data to Discord
        const response = await axios({
            method: 'POST',
            url: webhookURL,
            data: { content: JSON.stringify(req.body) },
            headers: { 'Content-Type': 'application/json' }
        });

        res.send('Success');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error sending data');
    }
});

// Handle non-POST methods (just as a fallback)
app.all('/', (req, res) => {
    console.log(`Received a ${req.method} request on the root endpoint`);
    res.status(405).send(`HTTP ${req.method} is not allowed. Please use POST.`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
