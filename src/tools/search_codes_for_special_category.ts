import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  handleMcpError,
  handleApiError,
  checkHotPepperApiResponse,
} from '../errors.js';
import config from '../config.js';
import { consoleLog } from '../console.js';

/**
 * Handle search codes for special category tool for MCP server
 * Retrieves all available special category codes and names from HotPepper API
 * @returns MCP-formatted response with special category codes and names
 */
export async function handleSearchCodesForSpecialCategory() {
  try {
    // Build the API request URL for special category master data
    const apiUrl = new URL(
      `${config.BASE_URL}${config.END_POINT.SPECIAL_CATEGORY}`,
    );
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('format', 'json');

    consoleLog('Fetching special category codes from HotPepper API');

    // Make the API request
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`),
        'handleSearchCodesForSpecialCategory API request',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    // if (data.results?.error) {
    //   const apiError = handleApiError(
    //     data.results.error,
    //     'handleSearchCodesForSpecialCategory HotPepper API',
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
    const specialCategoryCount = data.results?.special_category?.length || 0;
    consoleLog(`Retrieved ${specialCategoryCount} special category codes`);

    // Format the special category data for easy reference
    const specialCategoryCodes = (data.results?.special_category || []).map(
      (item: any) => ({
        code: item.code,
        name: item.name,
      }),
    );

    // Return structured results
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              description:
                'Available special category codes for promotional category filtering',
              count: specialCategoryCount,
              special_category_codes: specialCategoryCodes,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchCodesForSpecialCategory');
  }
}
