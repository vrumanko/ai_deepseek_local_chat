const API_URL = 'http://localhost:3000/api/chat';
const API_KEY = '1234567890';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to format the AI response
function formatAIResponse(text) {
    // Format code blocks
    text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
        return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Format inline code
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Format quotes
    text = text.replace(/(?:^|\n)>[ ]?(.*?)(?:\n|$)/g, (match, quote) => {
        return `\n<blockquote>${quote.trim()}</blockquote>\n`;
    });

    // Convert URLs to links
    text = text.replace(
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
        '<a href="$1" target="_blank">$1</a>'
    );

    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');

    return text;
}

// Function to add a message to the chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    
    if (isUser) {
        messageDiv.textContent = content;
    } else {
        messageDiv.innerHTML = formatAIResponse(content);
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send message to API
async function sendToAI(message) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-r1',
                prompt: message,
                stream: false,
                options: {
                    temperature: 0.7
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('API Response:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data.response;
    } catch (error) {
        console.error('Detailed error:', error);
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
}

// Handle send button click
async function handleSend() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message to chat
    addMessage(message, true);
    userInput.value = '';

    // Get AI response
    const aiResponse = await sendToAI(message);
    addMessage(aiResponse, false);
}

// Event listeners
sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
}); 