import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  handleMcpError,
  handleApiError,
  checkHotPepperApiResponse,
} from '../errors.js';
import config from '../config.js';
import { consoleLog } from '../console.js';

/**
 * Handle search codes for genre tool for MCP server
 * Retrieves all available genre codes and names from HotPepper API
 * @returns MCP-formatted response with genre codes and names
 */
export async function handleSearchCodesForGenre() {
  try {
    // Build the API request URL for genre master data
    const apiUrl = new URL(`${config.BASE_URL}${config.END_POINT.GENRE}`);
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('format', 'json');

    //consoleLog('Fetching genre codes from HotPepper API');

    // Make the API request
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`),
        'handleSearchCodesForGenre API request',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    // if (data.results?.error) {
    //   const apiError = handleApiError(
    //     data.results.error,
    //     'handleSearchCodesForGenre HotPepper API',
    //   );
    //   throw new McpError(ErrorCode.InternalError, apiError.message);
    // }
    // Handle API errors from HotPepper - Enhanced with checkHotPepperApiResponse
    const hotpepperError = checkHotPepperApiResponse(data);
    if (hotpepperError) {
      const apiError = handleApiError(
        hotpepperError,
        'handleSearchByKeyword HotPepper API',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    // Log successful retrieval
    const genreCount = data.results?.genre?.length || 0;
    //consoleLog(`Retrieved ${genreCount} genre codes`);

    // Format the genre data for easy reference
    const genreCodes = (data.results?.genre || []).map((item: any) => ({
      code: item.code,
      name: item.name,
    }));

    // Return structured results
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              description:
                'Available genre codes for restaurant type filtering',
              count: genreCount,
              genre_codes: genreCodes,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchCodesForGenre');
  }
}
