const WebSocket = require('ws');

module.exports = (req, res) => {
    if (!res.socket.server.wss) {
        console.log('Initializing WebSocket server...');
        const wss = new WebSocket.Server({ server: res.socket.server });

        let tasks = [];

        wss.on('connection', (ws) => {
            console.log('Client connected');

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
                    default:
                        console.log('Unknown message type:', data.type);
                }

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

        res.socket.server.wss = wss;
    }
    res.end();
};