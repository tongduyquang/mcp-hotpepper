import {
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";

import axios from "axios";
import config from "../config.js";
import { SearchByNameKanaInputSchema } from "./schemas.js";
import { handleMcpError, handleApiError } from "../errors.js";

const handleSearchByNameKana = async (params: any): Promise<CallToolResult> => {
    try {
        // Validate input parameters
        const validatedParams = SearchByNameKanaInputSchema.parse(params);
        
        // Make API call to HotPepper API
        const response = await axios.get(`${config.BASE_URL}${config.END_POINT.GOURMET}`, {
            params: {
                key: config.API_KEY,
                name: validatedParams.name_kana,
                format: 'json'
            }
        });

        // Return successful result
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response.data, null, 2)
                }
            ]
        };
    } catch (error) {
        // Handle API errors
        if (axios.isAxiosError(error)) {
            throw handleApiError(error, 'handleSearchByName');
        }
        
        // Handle MCP errors
        throw handleMcpError(error, 'handleSearchByName');
    }
};

export { handleSearchByNameKana };