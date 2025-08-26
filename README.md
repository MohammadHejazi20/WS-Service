
# ws-service

**v1 Beta** — WebSocket-based Pub/Sub Service

`ws-service` is a lightweight and scalable WebSocket-based Pub/Sub (Publish/Subscribe) service built in TypeScript. This service allows real-time communication between backend systems and frontend clients through WebSocket connections. It provides easy subscription management, message publishing, and robust connection handling.

## Features

- **WebSocket Connection Management**: Seamlessly connect and disconnect from the WebSocket service, with automatic reconnection support.
- **Topic Subscription**: Subscribe and unsubscribe from topics for receiving real-time messages.
- **Topic Publishing**: Publish messages to specific topics, with optional compression and message types.
- **Event Handling**: Handle incoming messages with custom event listeners.
- **Acknowledgements and Replies**: Wait for gateway acknowledgements or replies with timeout support.
- **Error Handling**: Robust error handling and logging capabilities.
- **TypeScript Support**: Strongly typed classes for better development experience.
- **Redis Pub/Sub (Optional)**: Integrate Redis for message distribution across multiple instances.

## Folder Structure

The folder structure follows a modular and scalable approach:

```
/ws-service
  ├── /src
  │   ├── /config
  │   │   └── redisConfig.ts        # Redis connection configurations (optional)
  │   ├── /controllers
  │   │   └── pubSubController.ts   # Handles logic for subscribing/unsubscribing, publishing messages
  │   ├── /events
  │   │   └── pubSubEvents.ts       # Custom event definitions and event emitter
  │   ├── /models
  │   │   └── message.ts            # Defines message types, topics, payload structure, etc.
  │   ├── /services
  │   │   ├── pubSubService.ts      # Core logic for Pub/Sub operations
  │   │   └── webSocketService.ts   # WebSocket connection and management logic
  │   ├── /utils
  │   │   └── logger.ts             # Custom logging utility
  │   ├── /webSockets
  │   │   └── wsServer.ts           # WebSocket server setup
  │   ├── index.ts                  # Main entry point (initialize WebSocket server, Redis)
  ├── /tests
  │   ├── pubSubService.test.ts     # Unit tests for pubSubService
  │   ├── webSocketService.test.ts  # Unit tests for webSocketService
  │   └── wsServer.test.ts          # Tests for WebSocket server
  ├── /logs
  │   └── server.log                # Log file for error/debug information
  ├── tsconfig.json                 # TypeScript configuration
  ├── package.json                  # Node dependencies and scripts
  └── .env                           # Environment variables (PORT, Redis configurations, etc.)
```

## Installation

To get started with the `ws-service`, follow these simple steps to set up the environment:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MohammadHejazi20/ws-service.git
   cd ws-service
   ```

2. **Install dependencies**:

   This project uses `pnpm` as the package manager. If you don’t have it installed, you can install it via `brew`:

   ```bash
   brew install pnpm
   ```

   Then, install the project dependencies:

   ```bash
   pnpm install
   ```

## Configuration

Before running the service, make sure to configure the environment variables in the `.env` file.

- `PORT`: Port on which the WebSocket server will run (default: `8080`).
- `REDIS_HOST`: Host for Redis server (optional if using Redis for Pub/Sub).

Example `.env` file:

```env
PORT=8080
REDIS_HOST=localhost
```

## Running the Service

1. **Development mode**:

   To run the server in development mode with live reloading, use:

   ```bash
   pnpm dev
   ```

2. **Production mode**:

   To build the project and run the production version:

   ```bash
   pnpm build
   pnpm start
   ```

## Usage

Once the WebSocket server is running, clients can connect to it and interact with the service.

### Example WebSocket Client Interaction

Using `websocat` or any WebSocket client, you can:

1. **Connect to the WebSocket server**:

   ```bash
   websocat ws://localhost:8080
   ```

2. **Subscribe to a topic**:

   Send a JSON message to subscribe to a topic (e.g., `chatroom`):

   ```json
   {
     "action": "subscribe",
     "topic": "chatroom"
   }
   ```

3. **Publish a message to a topic**:

   Send a message to the `chatroom` topic:

   ```json
   {
     "action": "publish",
     "topic": "chatroom",
     "payload": "Hello, World!"
   }
   ```

4. **Unsubscribe from a topic**:

   Send a message to unsubscribe:

   ```json
   {
     "action": "unsubscribe",
     "topic": "chatroom"
   }
   ```

### Example Frontend JavaScript for WebSocket Connection

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function () {
  console.log('Connected to WebSocket server');

  // Subscribe to 'chatroom'
  socket.send(JSON.stringify({
    action: 'subscribe',
    topic: 'chatroom'
  }));

  // Publish a message
  socket.send(JSON.stringify({
    action: 'publish',
    topic: 'chatroom',
    payload: 'Hello from the WebSocket server!'
  }));
});

socket.addEventListener('message', function (event) {
  console.log('Message from server: ', event.data);
});
```

## Testing

The service comes with unit tests for core functionality like Pub/Sub operations and WebSocket connections.

To run the tests:

```bash
pnpm test
```

## Error Logging

The service includes a basic logging system that logs all errors to the `logs` directory. You can check the `server.log` file for debugging information.

## Contributing

We welcome contributions! If you find any issues or would like to improve the service, feel free to open a pull request.

### To contribute

1. Fork the repository.
2. Clone your fork locally.
3. Create a new branch for your feature or fix.
4. Push your changes and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
