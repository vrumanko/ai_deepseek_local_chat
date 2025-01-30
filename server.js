// Import required Node.js modules
// express: Web application framework for Node.js
const express = require('express');
// cors: Enable Cross-Origin Resource Sharing
const cors = require('cors');
// path: Utilities for working with file and directory paths
const path = require('path');
// node-fetch: Library to make HTTP requests (similar to browser's fetch)
const fetch = require('node-fetch');

// Create an Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
// This allows the frontend to make requests to this server from different domains/ports
app.use(cors());

// Configure middleware to parse JSON request bodies
// This allows the server to read JSON data sent in POST requests
app.use(express.json());

// Serve static files (like HTML, CSS, JS) from the current directory
// __dirname is a Node.js variable that contains the directory path of the current file
app.use(express.static(__dirname));

/**
 * Handle POST requests to /api/chat endpoint
 * This endpoint acts as a proxy between the frontend and the Ollama AI API
 * It forwards requests from the frontend to Ollama and returns the response
 */
app.post('/api/chat', async (req, res) => {
    try {
        // Forward the request to Ollama API running locally
        // Ollama typically runs on port 11434
        const response = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Forward the request body as-is to Ollama
            body: JSON.stringify(req.body)
        });
        
        // Parse the Ollama response and send it back to the frontend
        const data = await response.json();
        res.json(data);
    } catch (error) {
        // If any error occurs during the request:
        // 1. Log the error to the server console
        console.error('Proxy error:', error);
        // 2. Send a 500 (Internal Server Error) response to the client
        // with the error message
        res.status(500).json({ error: error.message });
    }
});

// Define the port number for the server
const PORT = 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    // Log a message when the server successfully starts
    console.log(`Server running at http://localhost:${PORT}`);
}); 
