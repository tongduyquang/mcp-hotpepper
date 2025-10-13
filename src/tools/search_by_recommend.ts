import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { handleMcpError, handleApiError } from '../errors.js';
import { SearchGourmetsByRecommendInputSchema } from './schemas.js';
import config from '../config.js';
import { consoleLog } from '../console.js';

/**
 * Handle search by recommendation tool for MCP server
 * Searches HotPepper Gourmet API by recommendation parameters (special, genre, budget) and returns formatted results
 * @param params - Search parameters containing recommendation filters
 * @returns MCP-formatted response with search results
 */
export async function handleSearchByRecommend(params: any) {
  try {
    // Validate input parameters using Zod schema
    const validatedParams = SearchGourmetsByRecommendInputSchema.parse(params);

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
    if (validatedParams.genre)
      searchTerms.push(
        `genre: ${validatedParams.genre} (${getGenreName(validatedParams.genre)})`,
      );
    if (validatedParams.budget)
      searchTerms.push(
        `budget: ${validatedParams.budget} (${getBudgetName(validatedParams.budget)})`,
      );
    if (validatedParams.special)
      searchTerms.push(`special: ${validatedParams.special}`);
    if (validatedParams.special_or)
      searchTerms.push(`special_or: ${validatedParams.special_or}`);
    if (validatedParams.special_category)
      searchTerms.push(`special_category: ${validatedParams.special_category}`);
    if (validatedParams.special_category_or)
      searchTerms.push(
        `special_category_or: ${validatedParams.special_category_or}`,
      );

    const searchParams = searchTerms.join(', ');
    consoleLog(`Searching gourmets by recommendation: ${searchParams}`);

    // Make the API request
    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      const apiError = handleApiError(
        new Error(`HTTP ${response.status}: ${response.statusText}`),
        'handleSearchByRecommend API request',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    const data = await response.json();

    // Handle API errors from HotPepper
    if (data.results?.error) {
      const apiError = handleApiError(
        data.results.error,
        'handleSearchByRecommend HotPepper API',
      );
      throw new McpError(ErrorCode.InternalError, apiError.message);
    }

    // Log successful search
    consoleLog(
      `Found ${data.results?.results_available || 0} results for recommendation search: ${searchParams}`,
    );

    // Return structured results
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              search_params: searchParams,
              total_count: data.results?.results_available || 0,
              returned_count: data.results?.results_returned || 0,
              start: data.results?.results_start || 1,
              shops: data.results?.shop || [],
            },
            null,
            2,
          ),
        },
      ],
    };
  } catch (error) {
    // Use handleMcpError for consistent error handling and logging
    handleMcpError(error, 'handleSearchByRecommend');
  }
}

/**
 * Helper function to get genre name from code for better logging
 * @param genreCode - The genre code
 * @returns Human readable genre name
 */
function getGenreName(genreCode: string): string {
  const genreMap: Record<string, string> = {
    G001: '居酒屋',
    G002: 'ダイニングバー・バル',
    G003: '創作料理',
    G004: '和食',
    G005: '洋食',
    G006: 'イタリアン・フレンチ',
    G007: '中華',
    G008: '焼肉・ホルモン',
    G017: '韓国料理',
    G009: 'アジア・エスニック料理',
    G010: '各国料理',
    G011: 'カラオケ・パーティ',
    G012: 'バー・カクテル',
    G013: 'ラーメン',
    G016: 'お好み焼き・もんじゃ',
    G014: 'カフェ・スイーツ',
    G015: 'その他グルメ',
  };
  return genreMap[genreCode] || 'Unknown Genre';
}

/**
 * Helper function to get budget name from code for better logging
 * @param budgetCode - The budget code
 * @returns Human readable budget range
 */
function getBudgetName(budgetCode: string): string {
  const budgetMap: Record<string, string> = {
    B009: '～500円',
    B010: '501～1000円',
    B011: '1001～1500円',
    B001: '1501～2000円',
    B002: '2001～3000円',
    B003: '3001～4000円',
    B008: '4001～5000円',
    B004: '5001～7000円',
    B005: '7001～10000円',
    B006: '10001～15000円',
    B012: '15001～20000円',
    B013: '20001～30000円',
    B014: '30001円～',
  };
  return budgetMap[budgetCode] || 'Unknown Budget';
}
