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

export const SEARCH_GOURMET_BY_NAME_ANY: Tool = {
  name: 'search_gourmet_by_name_any',
  description: 'Search gourmet information by name or name in Kana',
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

// Search by large_service_area
export const SEARCH_GOURMETS_BY_LARGE_SERVICE_AREA: Tool = {
  name: 'search_gourmets_by_large_service_area',
  description: 'Search gourmets information by area codes',
  inputSchema: {
    type: 'object',
    properties: {
      large_service_area: {
        type: 'string',
        description: 'Large service area code',
        minLength: 1,
      },
     required: ['large_service_area'],
    },
  },
};

// Search by service_area
export const SEARCH_GOURMETS_BY_SERVICE_AREA: Tool = {
  name: 'search_gourmets_by_service_area',
  description: 'Search gourmets information by service area codes',
  inputSchema: {
    type: 'object',
    properties: {
      service_area: {
        type: 'string',
        description: 'Service area code',
        minLength: 1,
      },
    },
    required: ['service_area'],
  },
};

// Search by large_area
export const SEARCH_GOURMETS_BY_LARGE_AREA: Tool = {
  name: 'search_gourmets_by_large_area',
  description: 'Search gourmets information by large area codes',
  inputSchema: {
    type: 'object',
    properties: {
      large_area: {
        type: 'string',
        description: 'Large area code',
        minLength: 1,
      },
    },
    required: ['large_area'],
  },
};

// Search by middle_area
export const SEARCH_GOURMETS_BY_MIDDLE_AREA: Tool = {
  name: 'search_gourmets_by_middle_area',
  description: 'Search gourmets information by middle area codes',
  inputSchema: {
    type: 'object',
    properties: {
      middle_area: {
        type: 'string',
        description: 'Middle area code',
        minLength: 1,
      },
    },
    required: ['middle_area'],
  },
};

// Search by small_area
export const SEARCH_GOURMETS_BY_SMALL_AREA: Tool = {
  name: 'search_gourmets_by_small_area',
  description: 'Search gourmets information by small area codes',
  inputSchema: {
    type: 'object',
    properties: {
      small_area: {
        type: 'string',
        description: 'Small area code',
        minLength: 1,
      },
    },
    required: ['small_area'],
  },
};


 /**
  * Fuzzy search by any keyword
  * 店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。
  * 文字コードはUTF8。半角スペース区切りの文字列を渡すことでAND検索になる。
  * 複数指定可能*2
  * *2: keyword=value1&keyword=value2&...または keyword=value1,value2,...
  **/
export const SEARCH_GOURMETS_BY_KEYWORD: Tool = {
  name: 'search_gourmet_by_keyword',
  description: 'Fuzzy search gourmet information by any keyword',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'The keyword to search for gourmet information',
        minLength: 1,
      },
    },
    required: ['keyword'],
  },
};

export const TOOLS = [
  SEARCH_GOURMET_BY_ID,
  SEARCH_GOURMET_BY_NAME,
  SEARCH_GOURMET_BY_NAME_KANA,
  SEARCH_GOURMET_BY_NAME_ANY,
  SEARCH_GOURMET_BY_TEL,
  SEARCH_GOURMETS_BY_KEYWORD,
  SEARCH_GOURMETS_BY_LARGE_SERVICE_AREA,
  SEARCH_GOURMETS_BY_SERVICE_AREA,
  SEARCH_GOURMETS_BY_LARGE_AREA,
  SEARCH_GOURMETS_BY_MIDDLE_AREA,
  SEARCH_GOURMETS_BY_SMALL_AREA,

];
