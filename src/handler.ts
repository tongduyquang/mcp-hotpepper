import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { handleSearchById } from "./tools/index.js";
import { SEARCH_GOURMET_BY_ANY, SEARCH_GOURMET_BY_ID, SEARCH_GOURMET_BY_NAME,SEARCH_GOURMET_BY_NAME_KANA, SEARCH_GOURMET_BY_TEL } from "./tools/index.js";
/**
 * Dispatch tools on request
 */

export async function handleToolCall(toolName: string, params: any): Promise<any> {
    console.log(`Handling tool call for: ${toolName} with params:`, params);
    // Dispatch based on tool name
    switch (toolName) {
        case SEARCH_GOURMET_BY_ID.name:
            return await handleSearchById(params);
        case SEARCH_GOURMET_BY_NAME.name:
            return await handleSearchByName(params);
        case SEARCH_GOURMET_BY_NAME_KANA.name:
            return await handleSearchByNameKana(params);
        case SEARCH_GOURMET_BY_ANY.name:
            return await handleSearchByAny(params);
        case SEARCH_GOURMET_BY_TEL.name:
            return await handleSearchByTel(params);
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
    }
}
