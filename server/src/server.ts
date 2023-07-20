import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import path from 'path';
import fs from 'fs';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

const port = 8080;
const logFolderPath = path.join(__dirname, 'logs');
const logFilePath = path.join(logFolderPath, 'received_messages.log');

// Handle GET request to the root URL:
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Serve static files from the 'client' directory:
app.use('/client', express.static(path.join(__dirname, 'client')));

// Handle WebSocket connections:
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle disconnection event:
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  // Handle 'message' event:
  socket.on('message', (data: string) => {
    console.log('Received message:', data);
    saveToLogFile(data);
    // You can broadcast the received message to other connected clients:
    socket.broadcast.emit('message', data);
  });
});

// Save the received message to the log file:
function saveToLogFile(message: string): void {
  const logMessage = `[${new Date().toLocaleString()}] ${message}\n`;

  // Ensure the logs folder exists:
  if (!fs.existsSync(logFolderPath)) {
    fs.mkdirSync(logFolderPath);
  }

  try {
    fs.appendFileSync(logFilePath, logMessage);
    console.log('Message saved to log file:', logMessage);
  } catch (err) {
    console.error('Error saving message to log file:', err);
  }
}

// Start the HTTP server:
httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
