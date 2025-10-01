import {
  CallToolResult,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import { z } from "zod";

// SChema for input validation
export const SearchByIdInputSchema = z.object({
    id: z.string().min(1, "ID is required"),
});

const handleSearchById = async (params: any): Promise<CallToolResult> => {

    
}