import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { ZodError } from 'zod';

import { consoleLog, consoleError } from './console.js';

/**
 * Generic warning logging utility
 * @param warning - The warning message to log
 * @param context - Context where the warning occurred
 */
export function logWarning(warning: string, context: string): void {
  consoleLog(`Warning: ${warning} in ${context}`);
}

/**
 * Handle and transform API errors for the data layer
 * @param error - The error from API call
 * @param context - Context where the error occurred
 * @returns Transformed error with additional context
 */
export function handleApiError(error: unknown, context: string): Error {
  consoleError(`Error: ${error} in ${context}`);

  // Zod validation error handler
  if (error instanceof ZodError) {
    const details = error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join('; ');
    return new Error(`Validation Error in ${context}: ${details}`);
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    return new Error(`API Error [${status}]: ${message} in ${context}`);
  }

  if (error instanceof Error) {
    return new Error(`${error.message} in ${context}`);
  }

  return new Error(`Unknown error in ${context}`);
}

/**
 * Handle MCP-specific errors for the server layer
 * @param error - The error object to handle
 * @param context - Context where the error occurred
 * @throws Always throws either the original MCP error or a new internal error
 */
export function handleMcpError(error: unknown, context: string): never {
  consoleError(`MCP Error: ${error} in ${context}`);

  // Zod validation error handler for MCP
  if (error instanceof ZodError) {
    const details = error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join('; ');
    throw new McpError(
      ErrorCode.InvalidParams,
      `Validation Error in ${context}: ${details}`,
    );
  }

  if (error instanceof McpError) {
    throw error; // Rethrow MCP errors as is
  }
  throw new McpError(ErrorCode.InternalError, `Internal error in ${context}`);
}
