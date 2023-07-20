import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import path from 'path';
import fs from 'fs';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

const port = 3000;
const logFolderPath = path.join(__dirname, 'logs');
const logFilePath = path.join(logFolderPath, 'received_messages.log');

// Add a node for testing:
app.get('/test', (req: Request, res: Response) => {
    res.send('This is a test response from the server.');
  });
  