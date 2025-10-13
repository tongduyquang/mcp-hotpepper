import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  // ListResourcesRequestSchema,
  // ReadResourceRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { handleToolCall } from './handlers.js'; // , handleListResources, handleReadResource
import { TOOLS } from './tools/tools.js';
import { handleMcpError } from './errors.js';
import { consoleLog, consoleError } from './console.js';
export function createServer() {
  const server = new Server(
    {
      name: 'mcp-hotpepper',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    },
  );

  // Set up request handlers
  setupRequestHandlers(server);

  // Create STDIO transport
  const transport = new StdioServerTransport();
  return {
    start: async () => {
      try {
        await server.connect(transport);
        consoleLog('Hotpepper MCP server running on stdio');
      } catch (error) {
        consoleError(`Server error: ${error}`);
        throw error;
      }
    },
    stop: async () => {
      try {
        await server.close();
        consoleLog('Server disconnected');
      } catch (error) {
        consoleError(`Error during server shutdown: ${error}`);
        throw error;
      }
    },
  };
}

/**
 * Set up server request handlers
 */
function setupRequestHandlers(server: Server) {
  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const toolName = request.params.name;
      const toolArgs = request.params.arguments;

      return await handleToolCall(toolName, toolArgs);
    } catch (error) {
      return handleMcpError(error, 'CallToolRequest');
    }
  });
  // Handle listing resources
  // server.setRequestHandler(ListResourcesRequestSchema, async (request) => {
  //   try {
  //     return { resources: await handleListResources() };
  //   } catch (error) {
  //     return handleMcpError(error, 'ListResourcesRequest');
  //   }
  // });
  // Handle listing tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    try {
      return { tools: TOOLS }; // TODO: Implement tool listing
    } catch (error) {
      return handleMcpError(error, 'ListToolsRequest');
    }
  });
  // Handle reading a resource
  // server.setRequestHandler(ReadResourceRequestSchema, async (request) => {

  // };
}
