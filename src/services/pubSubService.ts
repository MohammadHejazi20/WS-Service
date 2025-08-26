/** biome-ignore-all lint/suspicious/noConsole: <explanation> */

import type { IncomingMessage } from 'node:http';
import type { WebSocket } from 'ws';

interface Message {
  topic: string;
  payload: any;
}

interface TopicInfo {
  subscribers: WebSocket[];
  messages: string[];
  clientInfo: ClientInfo[];
}

interface TableRow {
  topic: string;
  ipAddress: string;
  subscribedClients: number;
  publishedMessages: string[];
}

interface ClientInfo {
  ipAddress: string;
}

export class PubSubService {
  private topics = new Map<string, TopicInfo>();

  subscribe(ws: WebSocket, topic: string, req: IncomingMessage) {
    const clientInfo: ClientInfo = {
      ipAddress: req.connection.remoteAddress || 'Unknown IP',
    };

    if (!this.topics.has(topic)) {
      this.topics.set(topic, {
        subscribers: [],
        messages: [],
        clientInfo: [],
      });
    }

    const topicInfo = this.topics.get(topic);
    if (topicInfo) {
      topicInfo.subscribers.push(ws);
      topicInfo.clientInfo.push(clientInfo);
    }
    // console.log(`Client subscribed to topic: ${topic}`);
    this.updateTable();
  }

  unsubscribe(ws: WebSocket, topic: string) {
    const topicInfo = this.topics.get(topic);
    if (topicInfo) {
      topicInfo.subscribers = topicInfo.subscribers.filter(
        (subscriber) => subscriber !== ws
      );
      // console.log(`Client unsubscribed from topic: ${topic}`);
      this.updateTable();
    }
  }

  unsubscribeFromAll(ws: WebSocket) {
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    for (const [topic, topicInfo] of this.topics) {
      topicInfo.subscribers = topicInfo.subscribers.filter(
        (subscriber) => subscriber !== ws
      );
    }
    this.updateTable();
  }

  publish(message: Message) {
    const { topic, payload } = message;
    const topicInfo = this.topics.get(topic);
    if (topicInfo) {
      for (const ws of topicInfo.subscribers) {
        ws.send(JSON.stringify(payload));
      }
      // console.log(`Published message to topic: ${topic}`);
      topicInfo.messages.push(
        typeof payload === 'string' ? payload : JSON.stringify(payload)
      );
      this.updateTable();
    }
  }

  private updateTable() {
    console.clear();

    const tableData: TableRow[] = [];
    for (const [topic, info] of this.topics) {
      tableData.push({
        topic,
        ipAddress: info.clientInfo.map((c) => c.ipAddress).join(', '),
        subscribedClients: info.subscribers.length,
        publishedMessages: info.messages,
      });
    }

    console.table(tableData);
  }
}
