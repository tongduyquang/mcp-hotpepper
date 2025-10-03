import {
  CallToolResult,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import axios from "axios";
import config from "../config.js";
import { SearchByIdInputSchema } from "./schemas.js";


const handleSearchById = async (params: any): Promise<CallToolResult> => {
    try {
        // Validate input parameters
        const validatedParams = SearchByIdInputSchema.parse(params);
        
        // Make API call to HotPepper API
        const response = await axios.get('https://webservice.recruit.co.jp/hotpepper/gourmet/v1/', {
            params: {
                key: config.API_KEY,
                id: validatedParams.id,
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
        // Handle validation errors
        if (error instanceof z.ZodError) {
            throw new McpError(
                ErrorCode.InvalidParams,
                `Invalid parameters: ${error.errors.map(e => e.message).join(', ')}`
            );
        }
        
        // Handle API errors
        if (axios.isAxiosError(error)) {
            throw new McpError(
                ErrorCode.InternalError,
                `API request failed: ${error.message}`
            );
        }
        
        // Handle other errors
        throw new McpError(
            ErrorCode.InternalError,
            `Search by ID failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

export { handleSearchById };