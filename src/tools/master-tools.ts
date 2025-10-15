import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Search budget codes master
export const SEARCH_CODES_FOR_BUDGET: Tool = {
  name: 'search_codes_for_budget',
  description: `Search all available budget code-name pairs`,
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search genre codes master
export const SEARCH_CODES_FOR_GENRE: Tool = {
  name: 'search_codes_for_genre',
  description:
    'Search all available genre code-name pairs OR Search matched genre code-name pairs by optional free keyword',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description:
          'Optional free keyword to filter genres by name (e.g., "バー", "寿司", "居酒屋"). If provided, only genres matching the keyword will be returned.',
        minLength: 1,
      },
    },
  },
};

// Search special codes master
export const SEARCH_CODES_FOR_SPECIAL: Tool = {
  name: 'search_codes_for_special',
  description: `Search all available special code-name pairs
  WORKFLOW:
  1. First call search_codes_for_special_category to get available special category codes
  2. Then use a special category code here to filter results
  `,
  inputSchema: {
    type: 'object',
    properties: {
      special_category: {
        type: 'string',
        description:
          'Special category code (e.g., SPG1, SPF7, SPG2). Get valid codes from search_codes_for_special_category tool first.',
        minLength: 1,
      },
    },
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
  description: `Search all available large area code-name pairs`,
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search large area codes master by keyword only
export const SEARCH_CODES_FOR_LARGE_AREA_BY_KEYWORD: Tool = {
  name: 'search_codes_for_large_area',
  description: `Search matched large area code-name pairs by optional free keyword
    WORKFLOW:
    1. Use a free keyword to filter large areas by name
    2. If noMatch: Call tool search_codes_for_large_area
    `,
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description:
          'Optional free keyword to filter large areas by name (e.g., Z012 for "神奈川"). If provided, only large areas matching the keyword will be returned.',
        minLength: 1,
      },
    },
    required: ['keyword'],
  },
};

// Search middle area codes master
export const SEARCH_CODES_FOR_MIDDLE_AREA_BY_LARGE_AREA_CODE: Tool = {
  name: 'search_codes_for_middle_area',
  description: `Search all available middle area code-name pairs
    WORKFLOW:
    1. First call search_codes_for_large_area_by_keyword to get available large area codes
    2. Then use a large area code here to filter results
  `,
  inputSchema: {
    type: 'object',
    properties: {
      large_area: {
        type: 'string',
        description:
          'Optional large area code (e.g., Z011 for "東京"). Get valid codes from search_codes_for_large_area tool first.',
        minLength: 1,
      },
    },
  },
};

// Search middle area codes master by keyword only
export const SEARCH_CODES_FOR_MIDDLE_AREA_BY_KEYWORD: Tool = {
  name: 'search_codes_for_middle_area',
  description: `Search matched middle area code-name pairs by optional free keyword
    WORKFLOW:
    1. Use a free keyword to filter middle areas by name
    2. IF noMatch: Call tool search_codes_for_middle_area_by_large_area_code
  `,
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description:
          'Optional free keyword to filter middle areas by name (e.g., "銀座", "新橋"). If provided, only middle areas matching the keyword will be returned.',
        minLength: 1,
      },
    },
    required: ['keyword'],
  },
};

// Search small area codes master
export const SEARCH_CODES_FOR_SMALL_AREA_BY_MIDDLE_AREA_CODE: Tool = {
  name: 'search_codes_for_small_area',
  description: `Search all available small area code-name pairs
    WORKFLOW:
    1. First call search_codes_for_middle_area_by_keyword to get available middle area codes
    2. Then use a middle area code here to filter results
    `,
  inputSchema: {
    type: 'object',
    properties: {
      middle_area: {
        type: 'string',
        description:
          'Optional middle area code (e.g., Y005 for "銀座・有楽町・新橋・築地・月島" area). Get valid codes from search_codes_for_middle_area tool first.',
        minLength: 1,
      },
    },
  },
};

// Search small area codes master by keyword only
export const SEARCH_CODES_FOR_SMALL_AREA_BY_KEYWORD: Tool = {
  name: 'search_codes_for_small_area',
  description: `Search matched small area code-name pairs by optional free keyword
    WORKFLOW:
    1. Use a free keyword to filter small areas by name
    2. IF noMatch: Call tool search_codes_for_small_area_by_middle_area_code
    `,
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description:
          'Optional free keyword to filter small areas by name (e.g., "銀座", "新橋"). If provided, only small areas matching the keyword will be returned.',
        minLength: 1,
      },
    },
    required: ['keyword'],
  },
};

export const MASTER_TOOLS = [
  SEARCH_CODES_FOR_BUDGET,
  SEARCH_CODES_FOR_GENRE,
  SEARCH_CODES_FOR_SPECIAL,
  SEARCH_CODES_FOR_SPECIAL_CATEGORY,
  SEARCH_CODES_FOR_CREDIT_CARD,
  SEARCH_CODES_FOR_LARGE_SERVICE_AREA,
  SEARCH_CODES_FOR_SERVICE_AREA,
  SEARCH_CODES_FOR_LARGE_AREA_BY_KEYWORD,
  SEARCH_CODES_FOR_MIDDLE_AREA_BY_LARGE_AREA_CODE,
  SEARCH_CODES_FOR_MIDDLE_AREA_BY_KEYWORD,
  SEARCH_CODES_FOR_SMALL_AREA_BY_MIDDLE_AREA_CODE,
  SEARCH_CODES_FOR_SMALL_AREA_BY_KEYWORD,
];
