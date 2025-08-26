import type { IncomingMessage } from 'node:http';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { WebSocket } from 'ws';
import { PubSubService } from '../services/pubSubService';

describe('PubSubService', () => {
  let pubSubService: PubSubService;
  let mockWs: WebSocket;
  let mockReq: IncomingMessage;

  beforeEach(() => {
    pubSubService = new PubSubService();
    mockWs = { send: jest.fn() } as unknown as WebSocket; // Mock WebSocket object
    mockReq = {
      connection: { remoteAddress: '127.0.0.1' },
    } as unknown as IncomingMessage;
  });

  it('should subscribe and publish messages', () => {
    pubSubService.subscribe(mockWs, 'chatroom', mockReq);
    pubSubService.publish({ topic: 'chatroom', payload: 'Hello, world!' });

    expect(mockWs.send).toHaveBeenCalledWith(JSON.stringify('Hello, world!'));
  });

  it('should unsubscribe from topics', () => {
    pubSubService.subscribe(mockWs, 'chatroom', mockReq);
    pubSubService.unsubscribe(mockWs, 'chatroom');
    pubSubService.publish({ topic: 'chatroom', payload: 'Goodbye!' });

    expect(mockWs.send).not.toHaveBeenCalled();
  });
});
