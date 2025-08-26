/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import WebSocket from 'ws';

export class WebSocketManager {
  private ws: WebSocket | null = null;

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.on('open', () => {
      console.log('Connected to the server');
    });

    this.ws.on('message', (data) => {
      console.log('Received message: ', data);
    });

    this.ws.on('close', () => {
      console.log('Connection closed, attempting to reconnect...');
      setTimeout(() => this.connect(url), 1000); // Reconnect after 1 second
    });

    this.ws.on('error', (err) => {
      console.error('WebSocket Error: ', err);
    });
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
