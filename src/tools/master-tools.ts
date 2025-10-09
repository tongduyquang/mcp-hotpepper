import { Tool } from "@modelcontextprotocol/sdk/types.js";


// Search budget codes master
export const SEARCH_CODES_FOR_BUDGET: Tool = {
  name: 'search_codes_for_budget',
  description: 'Search all available budget code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search genre codes master
export const SEARCH_CODES_FOR_GENRE: Tool = {
  name: 'search_codes_for_genre',
  description: 'Search all available genre code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search special codes master
export const SEARCH_CODES_FOR_SPECIAL: Tool = {
  name: 'search_codes_for_special',
  description: 'Search all available special code-name pairs',
  inputSchema: {  
    type: 'object',
    properties: {},
  },
};


// Search special category codes master
export const SEARCH_CODES_FOR_SPECIAL_CATEGORY: Tool = {
  name: 'search_codes_for_special_category',
  description: 'Search all available special category code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};


// Search credit card codes master
export const SEARCH_CODES_FOR_CREDIT_CARD: Tool = {
  name: 'search_codes_for_credit_card',
  description: 'Search all available credit card code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search large service area codes master
export const SEARCH_CODES_FOR_LARGE_SERVICE_AREA: Tool = {
  name: 'search_codes_for_large_service_area',
  description: 'Search all available large service area code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search service area codes master
export const SEARCH_CODES_FOR_SERVICE_AREA: Tool = {
  name: 'search_codes_for_service_area',
  description: 'Search all available service area code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search large area codes master
export const SEARCH_CODES_FOR_LARGE_AREA: Tool = {
  name: 'search_codes_for_large_area',
  description: 'Search all available large area code-name pairs for a specific service area code',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search middle area codes master
export const SEARCH_CODES_FOR_MIDDLE_AREA: Tool = {
  name: 'search_codes_for_middle_area',
  description: 'Search all available middle area code-name pairs for a specific large area code. Use this tool BEFORE using middle_area parameter in searches to find the correct code for your desired area name.',
  inputSchema: {
    type: 'object',
    properties: {
      large_area: {
        type: 'string',
        description: 'Large area code (e.g., Z011 for Tokyo). Use SEARCH_CODES_FOR_LARGE_AREA first if you need to find this code.',
        minLength: 1,
      },
    },
    required: ['large_area'],
  },
};

// Search small area codes master
export const SEARCH_CODES_FOR_SMALL_AREA: Tool = {
  name: 'search_codes_for_small_area',
  description: 'Search all available small area code-name pairs for a specific middle area code. Use this tool BEFORE using small_area parameter in searches to find the correct code for your desired specific area name.',
  inputSchema: {
    type: 'object',
    properties: {
      middle_area: {
        type: 'string',
        description: 'Middle area code (e.g., Y005 for Ginza-Yurakucho area). Use SEARCH_CODES_FOR_MIDDLE_AREA first if you need to find this code.',
        minLength: 1,
      },
    },
    required: ['middle_area'],
  },
};

export default {
  SEARCH_CODES_FOR_BUDGET,
  SEARCH_CODES_FOR_GENRE,
  SEARCH_CODES_FOR_SPECIAL,
  SEARCH_CODES_FOR_SPECIAL_CATEGORY,
  SEARCH_CODES_FOR_CREDIT_CARD,
  SEARCH_CODES_FOR_LARGE_SERVICE_AREA,
  SEARCH_CODES_FOR_SERVICE_AREA,
  SEARCH_CODES_FOR_LARGE_AREA,
  SEARCH_CODES_FOR_MIDDLE_AREA,
  SEARCH_CODES_FOR_SMALL_AREA,
};