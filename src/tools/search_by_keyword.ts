import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { handleMcpError, handleApiError } from "../errors.js";
import { SearchGourmetComprehensiveInputSchema } from "./schemas.js";
import config from "../config.js";

/**
 * Handle search by keyword tool for MCP server
 * Searches HotPepper Gourmet API by comprehensive search parameters and returns formatted results
 * @param params - Search parameters containing keyword and optional filters
 * @returns MCP-formatted response with search results
 */
export async function handleSearchByKeyword(params: any) {
  try {
    // Validate input parameters using Zod schema
    const validatedParams = SearchGourmetComprehensiveInputSchema.parse(params);

    const { count = 10, start = 1, ...otherParams } = validatedParams;

    // Build the API request URL
    const apiUrl = new URL(`${config.BASE_URL}${config.END_POINT.GOURMET}`);
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('count', count.toString());
    apiUrl.searchParams.set('start', start.toString());
    apiUrl.searchParams.set('format', 'json');

    // Add all other parameters
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        apiUrl.searchParams.set(key, value.toString());
      }
    });

    // Create search description for logging
    const searchTerms = [];
    if (validatedParams.keyword) searchTerms.push(`keyword: "${validatedParams.keyword}"`);
    if (validatedParams.name) searchTerms.push(`name: "${validatedParams.name}"`);
    if (validatedParams.id) searchTerms.push(`id: "${validatedParams.id}"`);
    if (validatedParams.tel) searchTerms.push(`tel: "${validatedParams.tel}"`);
    if (validatedParams.address) searchTerms.push(`address: "${validatedParams.address}"`);
    
    const searchDescription = searchTerms.join(', ');
    console.log(`Searching gourmets with: ${searchDescription}`);

    // Make the API request
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`), 
        'handleSearchByKeyword API request'
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    if (data.results?.error) {
      const apiError = handleApiError(data.results.error, 'handleSearchByKeyword HotPepper API');
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    // Log successful search
    console.log(`Found ${data.results?.results_available || 0} results for: ${searchDescription}`);

    // Return structured results
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            search_params: searchDescription,
            total_count: data.results?.results_available || 0,
            returned_count: data.results?.results_returned || 0,
            start: data.results?.results_start || 1,
            shops: data.results?.shop || []
          }, null, 2)
        }
      ]
    };

  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchByKeyword');
  }
}