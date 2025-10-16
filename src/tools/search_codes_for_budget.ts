import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  handleMcpError,
  handleApiError,
  checkHotPepperApiResponse,
} from '../errors.js';
import config from '../config.js';
import { consoleLog } from '../console.js';

/**
 * Handle search codes for budget tool for MCP server
 * Retrieves all available budget codes and names from HotPepper API
 * @returns MCP-formatted response with budget codes and names
 */
export async function handleSearchCodesForBudget() {
  try {
    // Build the API request URL for budget master data
    const apiUrl = new URL(`${config.BASE_URL}${config.END_POINT.BUDGET}`);
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('format', 'json');

    //consoleLog('Fetching budget codes from HotPepper API');

    // Make the API request
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`),
        'handleSearchCodesForBudget API request',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    // if (data.results?.error) {
    //   const apiError = handleApiError(
    //     data.results.error,
    //     'handleSearchCodesForBudget HotPepper API',
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
    const budgetCount = data.results?.budget?.length || 0;
    //consoleLog(`Retrieved ${budgetCount} budget codes`);

    // Format the budget data for easy reference
    const budgetCodes = (data.results?.budget || []).map((item: any) => ({
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
              description: 'Available budget codes for dinner price filtering',
              count: budgetCount,
              budget_codes: budgetCodes,
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchCodesForBudget');
  }
}
