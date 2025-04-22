const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let tasks = [];

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send the current tasks to the newly connected client
    ws.send(JSON.stringify({ type: 'sync', tasks }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'add':
                tasks.push(data.task);
                break;
            case 'delete':
                tasks = tasks.filter(task => task.id !== data.taskId);
                break;
            case 'update':
                tasks = tasks.map(task => task.id === data.task.id ? data.task : task);
                break;
            case 'update-theme':
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'theme-update', theme: data.theme }));
                    }
                });
                break;
            case 'update-settings':
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'settings-update', settings: data.settings }));
                    }
                });
                break;
            default:
                console.log('Unknown message type:', data.type);
        }

        // Broadcast the updated tasks to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'sync', tasks }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');