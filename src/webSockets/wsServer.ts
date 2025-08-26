/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import WebSocket, { WebSocketServer as Server } from 'ws';
import { PubSubService } from '../services/pubSubService';
// import { WebSocketManager } from '../services/webSocketService';

export class WebSocketServer {
  private wss: Server;
  private pubSubService: PubSubService;

  constructor(port: number) {
    this.wss = new Server({ port });
    this.pubSubService = new PubSubService();
    this.setupConnections();
  }

  private setupConnections() {
    try {
      this.wss.on('connection', (ws, req) => {
        console.log('Client connected');
        // Store the request object on the WebSocket for later use
        (ws as any).request = req;
        ws.on('message', (message: string) => this.handleMessage(ws, message));
        ws.on('close', () => this.handleClose(ws));
      });
    } catch (error) {
      console.error('Error setting up WebSocket connections:', error);
      this.wss.close();
    }
  }

  private handleMessage(ws: WebSocket, message: string) {
    try {
      // Parse the message to handle subscriptions or publishing
      const parsedMessage = JSON.parse(message);
      const { action, topic, payload } = parsedMessage;

      if (action === 'subscribe') {
        const req = (ws as any).request;
        this.pubSubService.subscribe(ws, topic, req);
      } else if (action === 'unsubscribe') {
        this.pubSubService.unsubscribe(ws, topic);
      } else if (action === 'publish') {
        this.pubSubService.publish({ topic, payload });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
      console.log('Raw message:', message);
      ws.send(
        JSON.stringify({
          error: 'Invalid JSON message, please check your input.',
        })
      );
    }
  }

  private handleClose(ws: WebSocket) {
    console.log('Client disconnected');
    this.pubSubService.unsubscribeFromAll(ws); // Unsubscribe from all topics
  }

  broadcast(message: string) {
    for (const client of this.wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}
