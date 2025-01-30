// API configuration constants
// URL endpoint for the chat API server
const API_URL = 'http://localhost:3000/api/chat';
// Authentication key for API access
const API_KEY = '1234567890';

// Get references to DOM elements
// Container for all chat messages
const chatMessages = document.getElementById('chat-messages');
// Text input field for user messages
const userInput = document.getElementById('user-input');
// Button to send messages
const sendButton = document.getElementById('send-button');

/**
 * Formats the AI response text with markdown-like syntax
 * Converts various text patterns into HTML elements
 * @param {string} text - The raw text from AI response
 * @returns {string} Formatted HTML string
 */
function formatAIResponse(text) {
    // Convert code blocks (text between triple backticks) to <pre><code> elements
    text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
        return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Convert inline code (text between single backticks) to <code> elements
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Convert blockquotes (lines starting with >) to <blockquote> elements
    text = text.replace(/(?:^|\n)>[ ]?(.*?)(?:\n|$)/g, (match, quote) => {
        return `\n<blockquote>${quote.trim()}</blockquote>\n`;
    });

    // Convert URLs to clickable links
    // Matches http, https, ftp, and file URLs and wraps them in <a> tags
    text = text.replace(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
        '<a href="$1" target="_blank">$1</a>'
    );

    // Convert newlines to HTML line breaks
    text = text.replace(/\n/g, '<br>');

    return text;
}

/**
 * Adds a new message to the chat interface
 * @param {string} content - The message content to display
 * @param {boolean} isUser - True if message is from user, false if from AI
 */
function addMessage(content, isUser = false) {
    // Create a new div element for the message
    const messageDiv = document.createElement('div');
    // Add general message class and specific user/AI class
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    
    // Handle user messages as plain text, AI messages as formatted HTML
    if (isUser) {
        messageDiv.textContent = content;
    } else {
        messageDiv.innerHTML = formatAIResponse(content);
    }
    
    // Add message to chat container and scroll to bottom
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Sends a message to the AI API and returns the response
 * @param {string} message - The user's message to send to AI
 * @returns {Promise<string>} The AI's response
 */
async function sendToAI(message) {
    try {
        // Send POST request to API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-r1',    // AI model to use
                prompt: message,          // User's message
                stream: false,            // Don't stream response
                options: {
                    temperature: 0.7      // Controls randomness in AI response
                }
            })
        });

        // Check if request was successful
        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Response:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        // Parse and validate response
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.response;
    } catch (error) {
        // Log and return user-friendly error message
        console.error('Detailed error:', error);
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
}

/**
 * Handles the send message action
 * Gets user input, sends to AI, and displays response
 */
async function handleSend() {
    // Get and validate user message
    const message = userInput.value.trim();
    if (message === '') return;

    // Display user message and clear input
    addMessage(message, true);
    userInput.value = '';

    // Get and display AI response
    const aiResponse = await sendToAI(message);
    addMessage(aiResponse, false);
}

// Set up event listeners for user interactions
// Listen for click on send button
sendButton.addEventListener('click', handleSend);

// Listen for Enter key in input field (but not with Shift key)
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
}); 