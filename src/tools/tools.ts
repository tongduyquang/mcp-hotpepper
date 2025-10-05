import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Search by id
// 20個まで指定可。*2
// *2: id=value1&id=value2&...または id=value1,value2,...
export const SEARCH_GOURMET_BY_ID: Tool = {
  name: 'search_gourmet_by_id',
  description: 'Search gourmet information by ID (Exact match)',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique ID of the gourmet to search for',
        minLength: 1,
        maxLength: 20,
      },
      required: ['id'],
    },
  },
};

// Search by name
// お店の名前で検索(部分一致)します。
export const SEARCH_GOURMET_BY_NAME: Tool = {
  name: 'search_gourmet_by_name',
  description: 'Search gourmet information by name (Partial match)',
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

// Search by name_kana
// お店の読みかなで検索(部分一致)します。
export const SEARCH_GOURMET_BY_NAME_KANA: Tool = {
  name: 'search_gourmet_by_name_kana',
  description: 'Search gourmet information by name in Kana (Partial match)',
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

// Search by name_any
// お店の名前または読みかな両方をOR検索(部分一致)します。
export const SEARCH_GOURMET_BY_NAME_ANY: Tool = {
  name: 'search_gourmet_by_name_any',
  description: 'Search gourmet information by name or name in Kana (Partial match)',
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

// Search by tel
// お店の電話番号で検索します。半角数字(ハイフンなし)
export const SEARCH_GOURMET_BY_TEL: Tool = {
  name: 'search_gourmet_by_tel',
  description: 'Search gourmet information by telephone number (Exact match)',
  inputSchema: {
    type: 'object',
    properties: {
      tel: {
        type: 'string',
        description: 'The telephone number of the gourmet to search for - use half-width digits without hyphens',
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
        description: 'Large service area code. Choose from: SS10 (Kanto), SS20 (Kansai), SS30 (Tokai), SS40 (Hokkaido), SS50 (Tohoku), SS60 (Hokuriku/Koshinetsu), SS70 (Chugoku), SS80 (Shikoku), SS90 (Kyushu/Okinawa)',
        minLength: 1,
        enum: [
          'SS10', //関東
          'SS20', //関西
          'SS30', //東海
          'SS40', //北海道
          'SS50', //東北
          'SS60', //北陸・甲信越
          'SS70', //中国
          'SS80', //四国
          'SS90', //九州・沖縄
        ],
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
  description: 'Search gourmet information by name, name in Kana, address, station name, genre catchphrase, or free word (partial match).',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'Search keyword. Use UTF-8 encoding. Separate multiple keywords with spaces for AND search. Multiple keywords can be specified using keyword=value1&keyword=value2&... or keyword=value1,value2,...',
        minLength: 1,
      },
    },
    required: ['keyword'],
  },
};

// Search large service area codes
export const SEARCH_CODES_FOR_LARGE_SERVICE_AREA: Tool = {
  name: 'search_codes_for_large_service_area',
  description: 'Search all available large service area code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search service area codes
export const SEARCH_CODES_FOR_SERVICE_AREA: Tool = {
  name: 'search_codes_for_service_area',
  description: 'Search all available service area code-name pairs',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search large area codes
export const SEARCH_CODES_FOR_LARGE_AREA: Tool = {
  name: 'search_codes_for_large_area',
  description: 'Search all available large area code-name pairs for a specific service area code',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

// Search middle area codes
export const SEARCH_CODES_FOR_MIDDLE_AREA: Tool = {
  name: 'search_codes_for_middle_area',
  description: 'Search all available middle area code-name pairs for a specific large area code',
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

// Search small area codes
export const SEARCH_CODES_FOR_SMALL_AREA: Tool = {
  name: 'search_codes_for_small_area',
  description: 'Search all available small area code-name pairs for a specific middle area code',
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
