"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/data', (req, res) => {
    res.json({ message: 'GET endpoint' });
});
app.post('/data', (req, res) => {
    const data = req.body;
    res.json({ message: 'POST endpoint', data });
    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
});
// Iniciar el servidor HTTP
const server = app.listen(port, () => {
    console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
// Configurar el servidor WebSocket
const wss = new ws_1.WebSocketServer({ server });
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
