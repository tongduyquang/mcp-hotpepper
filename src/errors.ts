import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';

/**
 * Generic error logging utility
 * @param error - The error object to log
 * @param context - Context where the error occurred
 */
export function logError(error: unknown, context: string): void {
  console.error(`Error in ${context}:`, error);
}

/**
 * Handle and transform API errors for the data layer
 * @param error - The error from API call
 * @param context - Context where the error occurred
 * @returns Transformed error with additional context
 */
export function handleApiError(error: unknown, context: string): Error {
  logError(error, context);
  
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
  logError(error, context);

  if (error instanceof McpError) {
    throw error; // Rethrow MCP errors as is
  }
  throw new McpError(ErrorCode.InternalError, `Internal error in ${context}`);
}