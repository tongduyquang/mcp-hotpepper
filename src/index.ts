#!/usr/bin/env node

import { createServer } from './server.js';
import { config } from './config.js';
import { consoleLog, consoleError } from './console.js';
// Start the server
async function app() {
  if (!config.API_KEY) {
    throw new Error('API_KEY is not set in the environment variables.');
  }
  try {
    // 2. Create server
    const server = createServer();

    // 3. Start server
    await server.start();

    // 4. Graceful shutdown (optional, but recommended)
    handleExitSignal(server);
  } catch (error) {
    consoleError(`Error starting server: ${error}`);
    process.exit(1);
  }
}

function handleExitSignal(server: any) {
  const exitHandler = async () => {
    consoleLog('Received exit signal, shutting down...');
    await server.stop();
    process.exit(0);
  };

  process.on('SIGINT', exitHandler);
  process.on('SIGTERM', exitHandler);
  process.on('SIGQUIT', exitHandler);
  process.on('SIGKILL', exitHandler);
}

app().catch((error) => {
  consoleError(`Unhandled error in app: ${error}`);
  process.exit(1);
});
