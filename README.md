# AI Chat Application

A simple web-based chat application that uses the Ollama API to interact with the DeepSeek-R1 AI model.

## Prerequisites

Before running the application, make sure you have:

1. [Node.js](https://nodejs.org/) installed on your system
2. [Ollama](https://ollama.ai/) installed and running locally
3. The DeepSeek-R1 model installed in Ollama

## Ollama Installation

### Windows
1. Download Ollama for Windows from the official website:
   - Visit [https://ollama.ai/download](https://ollama.ai/download)
   - Click on the Windows download link
   - Run the downloaded installer

2. After installation:
   - Ollama will start automatically
   - You should see the Ollama icon in your system tray
   - The Ollama service will be running at http://127.0.0.1:11434

### macOS
1. Install using Homebrew:
```bash
brew install ollama
```

2. Start Ollama:
```bash
ollama serve
```

### Linux
1. Install using curl:
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

2. Start the Ollama service:
```bash
ollama serve
```

### Installing DeepSeek-R1 Model

After installing Ollama:

1. Open a terminal (Command Prompt or PowerShell on Windows)

2. Pull the DeepSeek-R1 model:
```bash
ollama pull deepseek-r1:latest
```

3. Wait for the download to complete (this may take several minutes depending on your internet connection)

4. Verify the installation:
```bash
ollama list
```
You should see 'deepseek-r1:latest' in the list of models

5. Run the model:
```bash
ollama run deepseek-r1:latest
```
This will start an interactive chat session with the model in your terminal. Type 'exit' to quit the session.

## Application Installation

1. Clone the repository:
```bash
git clone https://github.com/vrumanko/ai_deepseek_local_chat.git
cd ai_deepseek_local_chat
```

2. Install the required dependencies:
```bash
npm install
```

## Running the Application

1. Make sure Ollama is running:
   - On Windows: Check the system tray for the Ollama icon
   - On macOS/Linux: Run `ollama serve` if not already running

2. Start the application server:
```bash
npm start
```

3. Open your web browser and navigate to:
```
http://localhost:3000
```

## Features

- AI model and API endpoint runs locally on your machine
- Clean user interface, responsive design
- Real-time chat interaction with the DeepSeek-R1 AI model
- Error handling and status messages


## File Structure

- `index.html` - The main HTML file containing the chat interface
- `styles.css` - CSS styles for the chat application
- `script.js` - Client-side JavaScript code
- `server.js` - Node.js server that handles API proxying
- `package.json` - Project dependencies and scripts

## Technical Details

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js with Express
- AI Model: DeepSeek-R1 via Ollama
- API Endpoint: http://localhost:3000/api/chat
- Ollama API: http://127.0.0.1:11434/api/generate

## Troubleshooting

1. If you see "model not found" error:
   - Make sure Ollama is running:
     - Windows: Check system tray
     - macOS/Linux: Run `ps aux | grep ollama` to check if the process is running
   - Run `ollama pull deepseek-r1:latest` to install the model
   - Verify with `ollama list` that the model is installed
   - Try running `ollama run deepseek-r1:latest` to test the model directly

2. If the server won't start:
   - Check if port 3000 is already in use
   - Make sure all dependencies are installed
   - Try running `npm install` again

3. If you get CORS errors:
   - Make sure you're accessing the application through http://localhost:3000
   - Check if the server is running
   - Verify Ollama is running at http://127.0.0.1:11434

4. If Ollama won't start:
   - Windows: 
     - Check Windows Services
     - Try restarting the Ollama service
   - macOS/Linux:
     - Check system logs: `journalctl -u ollama`
     - Try restarting: `sudo systemctl restart ollama`

## License

This project is open source and available under the MIT License. 