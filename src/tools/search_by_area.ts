import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { handleMcpError, handleApiError } from "../errors.js";
import { SearchGourmetsByAreaInputSchema } from "./schemas.js";
import config from "../config.js";

/**
 * Handle search by area tool for MCP server
 * Searches HotPepper Gourmet API by area parameters and returns formatted results
 * @param params - Search parameters containing area codes and optional filters
 * @returns MCP-formatted response with search results
 */
export async function handleSearchByArea(params: any) {
  try {
    // Validate input parameters using Zod schema
    const validatedParams = SearchGourmetsByAreaInputSchema.parse(params);

    const { count = 10, start = 1, ...otherParams } = validatedParams;

    // Build the API request URL
    const apiUrl = new URL(`${config.BASE_URL}${config.END_POINT.GOURMET}`);
    apiUrl.searchParams.set('key', config.API_KEY || '');
    apiUrl.searchParams.set('count', count.toString());
    apiUrl.searchParams.set('start', start.toString());
    apiUrl.searchParams.set('format', 'json');

    // Add all parameters
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        apiUrl.searchParams.set(key, value.toString());
      }
    });

    // Create search description for logging
    const searchTerms = [];
    if (validatedParams.large_service_area) searchTerms.push(`large_service_area: ${validatedParams.large_service_area}`);
    if (validatedParams.service_area) searchTerms.push(`service_area: ${validatedParams.service_area}`);
    if (validatedParams.large_area) searchTerms.push(`large_area: ${validatedParams.large_area}`);
    if (validatedParams.middle_area) searchTerms.push(`middle_area: ${validatedParams.middle_area}`);
    if (validatedParams.small_area) searchTerms.push(`small_area: ${validatedParams.small_area}`);
    
    const searchParams = searchTerms.join(', ');
    console.log(`Searching gourmets by area: ${searchParams}`);

    // Make the API request
    const response = await fetch(apiUrl.toString());
    
    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`), 
        'handleSearchByArea API request'
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    if (data.results?.error) {
      const apiError = handleApiError(data.results.error, 'handleSearchByArea HotPepper API');
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    // Log successful search
    console.log(`Found ${data.results?.results_available || 0} results for area search: ${searchParams}`);

    // Return structured results
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            search_params: searchParams,
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
    handleMcpError(error, 'handleSearchByArea');
  }
}