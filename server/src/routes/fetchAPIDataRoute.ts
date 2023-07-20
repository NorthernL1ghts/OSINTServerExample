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

// New route for fetching data from an external API
app.get('/fetch-data', async (req: Request, res: Response) => {
    try {
      // TODO: Replace this with actual API endpoint:
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  });