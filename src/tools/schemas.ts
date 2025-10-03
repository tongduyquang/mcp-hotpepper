import { z } from 'zod';

// SChema for input validation
export const SearchByIdInputSchema = z.object({
    id: z.string().min(1, "ID is required"),
});