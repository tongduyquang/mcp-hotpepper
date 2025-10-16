import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { handleSearchByKeyword } from './tools/search_by_keyword.js';
import { handleSearchByArea } from './tools/search_by_area.js';
import { handleSearchByRecommend } from './tools/search_by_recommend.js';
import { handleSearchCodesForBudget } from './tools/search_codes_for_budget.js';
import { handleSearchCodesForGenre } from './tools/search_codes_for_genre.js';
import { handleSearchCodesForSpecial } from './tools/search_codes_for_special.js';
import { handleSearchCodesForSpecialCategory } from './tools/search_codes_for_special_category.js';
import { handleMcpError } from './errors.js';
import {
  // Search gourmets
  SEARCH_GOURMETS_BY_KEYWORD,
  SEARCH_GOURMETS_BY_AREA,
  SEARCH_GOURMETS_BY_RECOMMEND,
} from './tools/tools.js';
// import { consoleLog } from './console.js';

import {
  SEARCH_CODES_FOR_BUDGET,
  SEARCH_CODES_FOR_GENRE,
  SEARCH_CODES_FOR_SPECIAL,
  SEARCH_CODES_FOR_SPECIAL_CATEGORY,
  // SEARCH_CODES_FOR_CREDIT_CARD,
  // SEARCH_CODES_FOR_LARGE_SERVICE_AREA,
  // SEARCH_CODES_FOR_SERVICE_AREA,
  // SEARCH_CODES_FOR_LARGE_AREA,
  // SEARCH_CODES_FOR_MIDDLE_AREA,
  // SEARCH_CODES_FOR_SMALL_AREA,
} from './tools/master-tools.js';

/**
 * Dispatch tools on request
 */
export async function handleToolCall(
  toolName: string,
  toolArgs: any,
): Promise<any> {
  //consoleLog(
  //   `Handling tool call for: ${toolName} with params: ${JSON.stringify(toolArgs)}`,
  // );
  // Dispatch based on tool name
  switch (toolName) {
    case SEARCH_GOURMETS_BY_KEYWORD.name:
      return await handleSearchByKeyword(toolArgs);
    case SEARCH_GOURMETS_BY_AREA.name:
      return await handleSearchByArea(toolArgs);
    case SEARCH_GOURMETS_BY_RECOMMEND.name:
      return await handleSearchByRecommend(toolArgs);
    case SEARCH_CODES_FOR_BUDGET.name:
      return await handleSearchCodesForBudget();
    case SEARCH_CODES_FOR_GENRE.name:
      return await handleSearchCodesForGenre();
    case SEARCH_CODES_FOR_SPECIAL.name:
      return await handleSearchCodesForSpecial();
    case SEARCH_CODES_FOR_SPECIAL_CATEGORY.name:
      return await handleSearchCodesForSpecialCategory();

    default:
      throw handleMcpError(
        new McpError(ErrorCode.InvalidRequest, `Unknown tool: ${toolName}`),
        'handleToolCall',
      );
  }
}

export async function handleToolsList(): Promise<any> {
  // Return the list of available tools
  return {
    tools: [
      SEARCH_GOURMETS_BY_KEYWORD,
      SEARCH_GOURMETS_BY_AREA,
      SEARCH_GOURMETS_BY_RECOMMEND,
      SEARCH_CODES_FOR_BUDGET,
      SEARCH_CODES_FOR_GENRE,
      SEARCH_CODES_FOR_SPECIAL,
      SEARCH_CODES_FOR_SPECIAL_CATEGORY,
      // SEARCH_CODES_FOR_CREDIT_CARD,
      // SEARCH_CODES_FOR_LARGE_SERVICE_AREA,
      // SEARCH_CODES_FOR_SERVICE_AREA,
      // SEARCH_CODES_FOR_LARGE_AREA,
      // SEARCH_CODES_FOR_MIDDLE_AREA,
      // SEARCH_CODES_FOR_SMALL_AREA,
    ],
  };
}

// export async function handleListResources(): Promise<any> {

// }

// export async function handleReadResource(resourceId: string, params: any): Promise<any> {}
