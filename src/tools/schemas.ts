import { z } from 'zod';

// Schema for Id search
export const SearchByIdInputSchema = z.object({
    id: z.string().min(1, "ID is required"),
});

// Schema for Name search
export const SearchByNameInputSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

// Schema for Name Kana search
export const SearchByNameKanaInputSchema = z.object({
    name_kana: z.string().min(1, "Name Kana is required"),
});

// Schema for Any search
export const SearchByAnyInputSchema = z.object({
    keyword: z.string().min(1, "Keyword is required"),
});

// Schema for Tel search
export const SearchByTelInputSchema = z.object({
    tel: z.string().min(1, "Telephone number is required"),
});