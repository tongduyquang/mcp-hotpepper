import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const SEARCH_GOURMET_BY_ID: Tool = {
  name: 'search_gourmet_by_id',
  description: 'Search gourmet information by ID',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique ID of the gourmet to search for',
        minLength: 1,
      },
      required: ['id'],
    },
  },
};
export const SEARCH_GOURMET_BY_NAME: Tool = {
  name: 'search_gourmet_by_name',
  description: 'Search gourmet information by name',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the gourmet to search for',
        minLength: 1,
      },
      required: ['name'],
    },
  },
};

export const SEARCH_GOURMET_BY_NAME_KANA: Tool = {
  name: 'search_gourmet_by_name_kana',
  description: 'Search gourmet information by name in Kana',
  inputSchema: {
    type: 'object',
    properties: {
      name_kana: {
        type: 'string',
        description: 'The name in Kana of the gourmet to search for',
        minLength: 1,
      },
      required: ['name_kana'],
    },
  },
};

export const SEARCH_GOURMET_BY_ANY: Tool = {
  name: 'search_gourmet_by_any',
  description: 'Search gourmet information by any keyword',
  inputSchema: {
    type: 'object',
    properties: {
      name_any: {
        type: 'string',
        description: 'Any keyword to search for gourmet information',
        minLength: 1,
      },
      required: ['name_any'],
    },
  },
};

export const SEARCH_GOURMET_BY_TEL: Tool = {
  name: 'search_gourmet_by_tel',
  description: 'Search gourmet information by telephone number',
  inputSchema: {
    type: 'object',
    properties: {
      tel: {
        type: 'string',
        description: 'The telephone number of the gourmet to search for',
        minLength: 1,
      },
      required: ['tel'],
    },
  },
};

export const TOOLS = [
  SEARCH_GOURMET_BY_ID,
  SEARCH_GOURMET_BY_NAME,
  SEARCH_GOURMET_BY_NAME_KANA,
  SEARCH_GOURMET_BY_ANY,
  SEARCH_GOURMET_BY_TEL,
];
