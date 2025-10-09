import {
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";

import axios from "axios";
import config from "../config.js";
import { SearchByIdInputSchema } from "./schemas.js";
import { handleMcpError, handleApiError } from "../errors.js";

const handleSearchById = async (params: any): Promise<CallToolResult> => {
 
    // Validate input parameters
    const validatedParams = SearchByIdInputSchema.safeParse(params);
    
    if (!validatedParams.success) {
        const errorMessages = validatedParams.error.errors.map(err => err.message).join(", ");
        throw new Error(`Invalid input parameters: ${errorMessages}`);
    }

    try {
        // Make API call to HotPepper API
        const response = await axios.get(`${config.BASE_URL}${config.END_POINT.GOURMET}`, {
            params: {
                key: config.API_KEY,
                id: validatedParams.data.id,
                format: 'json'
            }
        });
        if (!response.data) {
            return {
                content: [
                    { type: "text", text: "No data found for the given ID." }
                ]
            };
        }

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
            throw handleApiError(error, 'handleSearchById');
        }
        
        // Handle MCP errors
        throw handleMcpError(error, 'handleSearchById');
    }
};
export { handleSearchById };