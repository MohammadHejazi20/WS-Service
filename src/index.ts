/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { WebSocketServer } from './webSockets/wsServer';

new WebSocketServer(8080);
console.log('WebSocket server is running on ws://localhost:8080');
