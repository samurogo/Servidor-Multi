import express, { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { Server } from 'http';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/data', (req: Request, res: Response) => {
    res.json({ message: 'GET endpoint' });
});

app.post('/data', (req: Request, res: Response) => {
    const data = req.body;
    res.json({ message: 'POST endpoint', data });

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});

// Iniciar el servidor HTTP
const server: Server = app.listen(port, () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});

// Configurar el servidor WebSocket
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');

    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
        ws.send(`Mensaje recibido: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});
