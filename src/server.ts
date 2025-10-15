import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  // ListResourcesRequestSchema,
  // ReadResourceRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { handleToolCall, handleToolsList } from './handlers.js'; // , handleListResources, handleReadResource
import { handleMcpError } from './errors.js';

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
        console.log('Hotpepper MCP server running on stdio');
      } catch (error) {
        console.error('Server error:', error);
        throw error;
      }
    },
    stop: async () => {
      try {
        await server.close();
        console.log('Server disconnected');
      } catch (error) {
        console.error('Error during server shutdown:', error);
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

  // Handle listing tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    try {
      return await handleToolsList();
    } catch (error) {
      return handleMcpError(error, 'ListToolsRequest');
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

  // Handle reading a resource
  // server.setRequestHandler(ReadResourceRequestSchema, async (request) => {

  // };
}
