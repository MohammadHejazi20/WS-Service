import { EventEmitter } from 'node:events';

export const pubSubEventEmitter = new EventEmitter();

export const EVENT_SUBSCRIBE = 'subscribe';
export const EVENT_UNSUBSCRIBE = 'unsubscribe';
export const EVENT_PUBLISH = 'publish';
