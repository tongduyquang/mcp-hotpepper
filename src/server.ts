// server.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  McpError, 
  ErrorCode,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import config from './config.js';
import axios from 'axios';
import { handleListResources, handleReadResource } from "./resources.js";
import { handleToolCall } from './handlers.js';
import { TOOLS } from './tools/index.js';
// const server = new Server(
//   {
//     name: 'mcp-hotpepper',
//     version: '1.0.0',
//   },
//   {
//     capabilities: {
//       tools: {},
//       resources: {},
//     },
//   },
// );

// async function main() {
//   const transport = new StdioServerTransport();
//   await server.connect(transport);
//   console.error('Hotpepper MCP server running on stdio');
// }

// main().catch((error) => {
//   console.error('Server error:', error);
//   process.exit(1);
// });

export function createServer() {
  const server = new Server({
    name: 'mcp-hotpepper',
    version: '1.0.0',
  }, {
    capabilities: {
      tools: {},
      resources: {},
    },
  });

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
        try {        await server.close();
        console.log('Server disconnected');}
        catch (error) {
          console.error('Error during server shutdown:', error);
          throw error;
        }
      },
    }
} 

/**
 * Handle error logging and rethrowing
 */
function handleError(error: unknown, context: string): never {
  console.error(`Error in ${context}:`, error);

  if (error instanceof McpError) {
    throw error; // Rethrow MCP errors as is
  }
  throw new McpError(ErrorCode.InternalError, `Internal error in ${context}`);
}


/**
 * Set up server request handlers
 */
function setupRequestHandlers(server: Server) {
  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const { tool, input } = request.params;

      return await handleToolCall(tool, input);
    } catch (error) {
      return handleError(error, 'CallToolRequest');
    }
  });
  // Handle listing resources
  server.setRequestHandler(ListResourcesRequestSchema, async (request) => {
    try {
      return { resources: await handleListResources() };
    }
    catch (error) {
      return handleError(error, 'ListResourcesRequest');
    }
  });
  // Handle listing tools
  server.setRequestHandler(ListToolsRequestSchema, async (request) => {
    try {
      return { tools: TOOLS }; // TODO: Implement tool listing
    }
    catch (error) {
      return handleError(error, 'ListToolsRequest');
    }
  });
  // Handle reading a resource
  // server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    
  // };

};


