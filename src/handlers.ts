import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { handleSearchById } from './tools/search_by_id.js';
import { handleSearchByName } from './tools/search_by_name.js';
import { handleSearchByNameKana } from './tools/searchByNameKana.js';
import { handleSearchByAny } from './tools/searchByAny.js';
import { handleSearchByTel } from './tools/searchByTel.js';
// import { handleSearchByKeyword } from './tools/searchByKeyword.js';
import { handleMcpError } from './errors.js';
import {
  // Search gourmets 
  SEARCH_GOURMETS_BY_KEYWORD,
  SEARCH_GOURMETS_BY_AREA,
  SEARCH_GOURMETS_BY_RECOMMEND,
  // Serach master data
  SEARCH_CODES_BY_

} from './tools/tools.js';

/**
 * Dispatch tools on request
 */
export async function handleToolCall(tool: string, params: any): Promise<any> {
  console.log(`Handling tool call for: ${tool} with params:`, params);
  // Dispatch based on tool name
  switch (tool) {
    case SEARCH_GOURMETS_BY_KEYWORD.name:
      return await handleSearchById(params);
    case SEARCH_GOURMETS_BY_AREA.name:
      return await handleSearchByName(params);
    case SEARCH_GOURMETS_BY_RECOMMEND.name:
      return await handleSearchByNameKana(params);

    default:
      throw handleMcpError(new McpError(ErrorCode.InvalidRequest, `Unknown tool: ${tool}`), 'handleToolCall');
  }
}

export async function handleListResources(): Promise<any> {
  
}

// export async function handleReadResource(resourceId: string, params: any): Promise<any> {}
