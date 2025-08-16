const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running\n');
});

const wss = new WebSocket.Server({ server });

const currentSessions = new Map();

wss.on('connection', (ws) => {
    console.log('New client connected');
    // Assign a session ID to the new client
    const newSessionId = Math.random().toString(36).substring(2, 15);

    currentSessions.set(newSessionId, {
        player: {
            x: 0,
            y: 0,
            hp: 100,
            inventory: [],
        },
        chat: {
            currentMessage: "",
            createdAt: Date.now(),
        }
    });

    ws.send(JSON.stringify({ type: 'session', sessionId: newSessionId }));

    ws.on('message', (message) => {
        // Parse the incoming message
        let parsed;
        try {
            parsed = JSON.parse(message);
        } catch (e) {
            console.log('Failed to parse message:', message);
            return;
        }
        console.log(`Received:`, parsed);

        switch (parsed.type) {
            case 'player move':
                const session = currentSessions.get(parsed.sessionId);
                if (session) {
                    session.player.x = parsed.x;
                    session.player.y = parsed.y;
                }
                break;
            case 'chat message':
                const chatSession = currentSessions.get(parsed.sessionId);
                if (chatSession) {
                    chatSession.chat.currentMessage = parsed.message;
                    chatSession.chat.createdAt = Date.now();
                }
                break;
            default:
                console.log('Unknown message type:', parsed.type);
        }

        // Broadcast the parsed message to all clients as JSON
        const broadcast = JSON.stringify(parsed);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(broadcast);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});