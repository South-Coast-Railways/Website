const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Set your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1137796062044749894/ugJ72eN5li6jbb2PwFBFIqB4akfyJtuqNFru6rWAbCx0GsiMjMXZoDmNK6GYJZB7Raag';

// Middleware to parse raw JSON body
app.use(express.json());

app.post('/', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
