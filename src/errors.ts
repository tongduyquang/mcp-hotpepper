import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { ZodError } from 'zod';

import { consoleError } from './console.js';

/**
 * Handle and transform API errors for the data layer with HotPepper-specific error handling
 * @param error - The error from API call or HotPepper API response
 * @param context - Context where the error occurred
 * @returns Transformed error with additional context and HotPepper error codes
 */
export function handleApiError(error: unknown, context: string): Error {
  consoleError(`Error: ${error} in ${context}`);

  // Handle HotPepper API specific errors (comes as response data, not HTTP error)
  if (isHotPepperApiError(error)) {
    const hotpepperError = error as HotPepperApiError;
    const errorMessage = getHotPepperErrorMessage(
      hotpepperError.code,
      hotpepperError.message,
    );
    return new Error(
      `HotPepper API Error [${hotpepperError.code}]: ${errorMessage} in ${context}`,
    );
  }

  // Zod validation error handler
  if (error instanceof ZodError) {
    const details = error.errors
      .map((e) => `${e.path.join('.')}: ${e.message}`)
      .join('; ');
    return new Error(`Validation Error in ${context}: ${details}`);
  }

  // HTTP errors (should be rare with HotPepper since they return 200)
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    return new Error(`HTTP Error [${status}]: ${message} in ${context}`);
  }

  // Fetch API errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new Error(`Network Error: ${error.message} in ${context}`);
  }

  if (error instanceof Error) {
    return new Error(`${error.message} in ${context}`);
  }

  return new Error(`Unknown error in ${context}`);
}

/**
 * Interface for HotPepper API error structure
 */
interface HotPepperApiError {
  message: string;
  code: string | number;
}

/**
 * Type guard to check if error is a HotPepper API error
 * @param error - The error object to check
 * @returns True if error matches HotPepper API error structure
 */
function isHotPepperApiError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error &&
    typeof (error as any).message === 'string' &&
    (typeof (error as any).code === 'string' ||
      typeof (error as any).code === 'number')
  );
}

/**
 * Get human-readable error message based on HotPepper error codes
 * @param code - HotPepper error code (1000, 2000, 3000)
 * @param originalMessage - Original error message from API
 * @returns Enhanced error message with code explanation
 */
function getHotPepperErrorMessage(
  code: string | number,
  originalMessage: string,
): string {
  const codeNum = typeof code === 'string' ? parseInt(code, 10) : code;

  switch (codeNum) {
    case 1000:
      return `Server Error - ${originalMessage} (HotPepper server is experiencing issues)`;
    case 2000:
      return `Authentication Error - ${originalMessage} (Invalid API key or IP address not authorized)`;
    case 3000:
      return `Parameter Error - ${originalMessage} (Invalid or missing required parameters)`;
    default:
      return `${originalMessage} (Unknown error code: ${code})`;
  }
}

/**
 * Utility function to check API response for HotPepper errors
 * @param responseData - The parsed JSON/XML response from HotPepper API
 * @returns HotPepperApiError if error exists, null otherwise
 */
export function checkHotPepperApiResponse(
  responseData: any,
): HotPepperApiError | null {
  // Check for error in results.error (JSON format)
  if (responseData?.results?.error) {
    return {
      message: responseData.results.error.message || 'Unknown error',
      code: responseData.results.error.code || 'unknown',
    };
  }

  // Check for direct error property (XML parsed format)
  if (responseData?.error) {
    return {
      message: responseData.error.message || 'Unknown error',
      code: responseData.error.code || 'unknown',
    };
  }

  return null;
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
