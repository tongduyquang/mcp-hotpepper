import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  handleMcpError,
  handleApiError,
  checkHotPepperApiResponse,
} from '../errors.js';
import config from '../config.js';
import { consoleLog } from '../console.js';

/**
 * Handle search codes for special tool for MCP server
 * Retrieves all available special codes and names from HotPepper API
 * @returns MCP-formatted response with special codes and names
 */
export async function handleSearchCodesForSpecial() {
  try {
    // Build the API request URL for special master data
    const apiUrl = new URL(`${config.BASE_URL}${config.END_POINT.SPECIAL}`);
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('format', 'json');

    consoleLog('Fetching special codes from HotPepper API');

    // Make the API request
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`),
        'handleSearchCodesForSpecial API request',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    // if (data.results?.error) {
    //   const apiError = handleApiError(
    //     data.results.error,
    //     'handleSearchCodesForSpecial HotPepper API',
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
    const specialCount = data.results?.special?.length || 0;
    consoleLog(`Retrieved ${specialCount} special codes`);

    // Format the special data for easy reference
    const specialCodes = (data.results?.special || []).map((item: any) => ({
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
                'Available special codes for promotional campaign filtering',
              count: specialCount,
              special_codes: specialCodes,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchCodesForSpecial');
  }
}
