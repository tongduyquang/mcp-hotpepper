import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { maxLength, minLength } from 'zod/v4';

// Reusable parameter schemas
export const COMMON_OPTIONAL_PARAMS = {

} as const;

// Search by id
// 20個まで指定可。*2
// *2: id=value1&id=value2&...または id=value1,value2,...
export const SEARCH_GOURMET_BY_ID: Tool = {
  name: 'search_gourmet_by_id',
  description: 'Search gourmet information by ID (Exact match) with optional filters',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The unique ID of the gourmet to search for',
        minLength: 1,
        maxLength: 20,
      },
      // Optional filtering parameters
      genre: {
        type: 'string',
        description: 'Filter by genre code (optional)',
        enum: [
          'G001', 'G002', 'G003', 'G004', 'G005', 'G006', 'G007', 'G008', 
          'G017', 'G009', 'G010', 'G011', 'G012', 'G013', 'G016', 'G014', 'G015'
        ],
      },
      budget: {
        type: 'string',
        description: 'Filter by dinner budget code (optional)',
      },
      // Location parameters
      lat: {
        type: 'number',
        description: 'Latitude for location-based search (optional)',
      },
      lng: {
        type: 'number', 
        description: 'Longitude for location-based search (optional)',
      },
      range: {
        type: 'integer',
        description: 'Search range (1:300m, 2:500m, 3:1000m, 4:2000m, 5:3000m)',
        enum: [1, 2, 3, 4, 5],
      },
      // Common filters
      wifi: {
        type: 'integer',
        description: 'WiFi availability (0: no filter, 1: filter by WiFi available)',
        enum: [0, 1],
      },
      private_room: {
        type: 'integer',
        description: 'Private room availability (0: no filter, 1: filter by private room available)',
        enum: [0, 1],
      },
      free_drink: {
        type: 'integer',
        description: 'All-you-can-drink availability (0: no filter, 1: filter by available)',
        enum: [0, 1],
      },
      // Response control
      count: {
        type: 'integer',
        description: 'Number of results to return (1-100, default: 10)',
        minimum: 1,
        maximum: 100,
      },
      start: {
        type: 'integer',
        description: 'Starting position for results (default: 1)',
        minimum: 1,
      },
    },
    required: ['id'],
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

// Search by genre
export const SEARCH_GOURMETS_BY_GENRE: Tool = {
  name: 'search_gourmets_by_genre',
  description: 'Search gourmets information by genre codes',
  inputSchema: {
    type: 'object',
    properties: {
      genre: {
        type: 'string',
        description: 'Genre code. Choose from: G001 (居酒屋), G002 (ダイニングバー・バル), G003 (創作料理), G004 (和食), G005 (洋食), G006 (イタリアン・フレンチ), G007 (中華), G008 (焼肉・ホルモン), G017 (韓国料理), G009 (アジア・エスニック料理), G010 (各国料理), G011 (カラオケ・パーティ), G012 (バー・カクテル), G013 (ラーメン), G016 (お好み焼き・もんじゃ), G014 (カフェ・スイーツ), G015 (その他グルメ)',
        minLength: 1,
        enum: [
          'G001', // 居酒屋
          'G002', // ダイニングバー・バル
          'G003', // 創作料理
          'G004', // 和食
          'G005', // 洋食
          'G006', // イタリアン・フレンチ
          'G007', // 中華
          'G008', // 焼肉・ホルモン
          'G017', // 韓国料理
          'G009', // アジア・エスニック料理
          'G010', // 各国料理
          'G011', // カラオケ・パーティ
          'G012', // バー・カクテル
          'G013', // ラーメン
          'G016', // お好み焼き・もんじゃ
          'G014', // カフェ・スイーツ
          'G015', // その他グルメ
        ],
      },
    },
    required: ['genre'],
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

// Comprehensive search tool with all available parameters
export const SEARCH_GOURMET_COMPREHENSIVE: Tool = {
  name: 'search_gourmet_comprehensive',
  description: 'Comprehensive gourmet search with all available filters and parameters',
  inputSchema: {
    type: 'object',
    properties: {
      // Primary search parameters (at least one required)
      id: {
        type: 'string',
        description: 'お店に割り当てられた番号で検索します。(完全一致)。複数指定可能 (key=value1,value2,...)',
        maxLength: 20,
      },
      name: {
        type: 'string',
        description: 'お店の名前で検索します。(部分一致)',
      },
      name_kana: {
        type: 'string',
        description: 'お店の読みかなで検索します。(部分一致)',
      },
      name_any: {
        type: 'string',
        description: 'お店の名前または読みかなで検索します。(OR検索、部分一致)',
      },
      tel: {
        type: 'string',
        description: '電話番号で検索します。(完全一致、半角数字、ハイフンなし)',
      },
      address: {
        type: 'string',
        description: 'お店の住所で検索します。。(部分一致)',
      },
      keyword: {
        type: 'string',
        description: '店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチーのフリーワード検索可能です。(部分一致、UTF8、半角スペース区切りの文字列でAND検索)',
      },
      
      // Location parameters - SKIPPED for now
      // lat: { type: 'number', description: 'ある地点からの範囲内のお店の検索を行う場合の緯度です。' },
      // lng: { type: 'number', description: 'ある地点からの範囲内のお店の検索を行う場合の経度です。' },
      // range: { 
      //   type: 'integer', 
      //   description: 'ある地点からの範囲内のお店の検索を行う場合の範囲を5段階で指定できます。 (1:300m, 2:500m, 3:1000m, 4:2000m, 5:3000m)',
      //   enum: [1, 2, 3, 4, 5] 
      // },
      // datum: {
      //   type: 'string',
      //   description: '緯度・経度の測地系を指定できます。world: 世界測地系、tokyo: 旧日本測地系。初期値は world',
      //   enum: ['world', 'tokyo']
      // },
      
      // Area filters
      large_service_area: { 
        type: 'string', 
        description: '大サービスエリアに割り当てられたコード番号で検索します。(SS10:関東, SS20:関西, SS30:東海, SS40:北海道, SS50:東北, SS60:北陸・甲信越, SS70:中国, SS80:四国, SS90:九州・沖縄)',
        enum: ['SS10', 'SS20', 'SS30', 'SS40', 'SS50', 'SS60', 'SS70', 'SS80', 'SS90']
      },
      service_area: { 
        type: 'string', 
        description: 'サービスエリアに割り当てられたコード番号で検索します。複数指定可能 (key=value1,value2,...) Use SEARCH_CODES_FOR_SERVICE_AREA tool first to get available codes with names',
        maxLength: 3
      },
      large_area: { 
        type: 'string', 
        description: '大エリアに割り当てられたコード番号で検索します。複数指定可能 (key=value1,value2,...) Use SEARCH_CODES_FOR_LARGE_AREA tool first to get available codes with names',
        maxLength: 3
      },
      middle_area: { 
        type: 'string', 
        description: '中エリアに割り当てられたコード番号で検索します。複数指定可能 (key=value1,value2,...) Use SEARCH_CODES_FOR_MIDDLE_AREA tool first to get available codes with names for a specific large_area',
        maxLength: 5
      },
      small_area: { 
        type: 'string', 
        description: '小エリアに割り当てられたコード番号で検索します。複数指定可能 (key=value1,value2,...) Use SEARCH_CODES_FOR_SMALL_AREA tool first to get available codes with names for a specific middle_area',
        maxLength: 5
      },     
      // Category filters
      genre: {
        type: 'string',
        description: 'お店のジャンルで絞込むことができます。(G001:居酒屋, G002:ダイニングバー・バル, G003:創作料理, G004:和食, G005:洋食, G006:イタリアン・フレンチ, G007:中華, G008:焼肉・ホルモン, G017:韓国料理, G009:アジア・エスニック料理, G010:各国料理, G011:カラオケ・パーティ, G012:バー・カクテル, G013:ラーメン, G016:お好み焼き・もんじゃ, G014:カフェ・スイーツ, G015:その他グルメ)',
        enum: ['G001', 'G002', 'G003', 'G004', 'G005', 'G006', 'G007', 'G008', 
               'G017', 'G009', 'G010', 'G011', 'G012', 'G013', 'G016', 'G014', 'G015'],
        
      },
      // Budget filter
      budget: { 
        type: 'string', 
        description: 'ディナー予算で絞り込むことができます。複数指定可能 (key=value1,value2,...) (B009: ～500円, B010: 501～1000円, B011: 1001～1500円, B001: 1501～2000円, B002: 2001～3000円, B003: 3001～4000円, B008: 4001～5000円, B004: 5001～7000円, B005: 7001～10000円, B006: 10001～15000円, B012: 15001～20000円, B013: 20001～30000円, B014: 30001円～)', 
        enum: ['B009', 'B010', 'B011', 'B001', 'B002', 'B003', 'B008', 'B004', 'B005', 'B006', 'B012', 'B013', 'B014'],
        maxLength: 2
      },

      // Special filters
      special: { type: 'string', description: '特集コードをANDで絞り込みができます。特集コードは特集マスタAPI参照。複数指定可能 (key=value1,value2,...)' },
      special_or: { type: 'string', description: '特集コードをORで絞り込みができます。特集コードは特集マスタAPI参照。複数指定可能です。 (key=value1,value2,...)' },
      special_category: { type: 'string', description: '特集カテゴリコードをANDで絞り込みができます。特集カテゴリコードは特集カテゴリマスタAPI参照。複数指定可能です。 (key=value1,value2,...)' },
      special_category_or: { type: 'string', description: '特集カテゴリコードをORで絞り込みができます。特集カテゴリコードは特集カテゴリマスタAPI参照。複数指定可能です。 (key=value1,value2,...)' },

      // Additional filters
      party_capacity: { 
        type: 'integer', 
        description: '宴会収容人数で絞り込むことができます。指定数より大きな収容人数のお店を検索します (例: 50)',
        minimum: 1
      },
      
      // Facility filters (0: no filter, 1: filter by available)
      ktai_coupon: { type: 'integer', enum: [0, 1], description: '携帯クーポンの有無で絞り込み条件を指定します。 (0:携帯クーポンあり, 1:携帯クーポンなし, 指定なし:絞り込みなし)' },
      wifi: { type: 'integer', enum: [0, 1], description: 'WiFi 経由によるインターネット利用が可能なお店を絞り込みます。(0:絞り込まない（初期値）, 1:絞り込む)' },
      wedding: { type: 'integer', enum: [0, 1], description: 'ウェディング・二次会等のお問い合わせが可能なお店を絞り込みます。(0:絞り込まない（初期値）, 1:絞り込む)' },
      course: { type: 'integer', enum: [0, 1], description: '「コースあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      free_drink: { type: 'integer', enum: [0, 1], description: '「飲み放題」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      free_food: { type: 'integer', enum: [0, 1], description: '「食べ放題」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      private_room: { type: 'integer', enum: [0, 1], description: '「個室あり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      horigotatsu: { type: 'integer', enum: [0, 1], description: '「掘りごたつあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      tatami: { type: 'integer', enum: [0, 1], description: '「座敷あり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      cocktail: { type: 'integer', enum: [0, 1], description: '「カクテル充実」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      shochu: { type: 'integer', enum: [0, 1], description: '「焼酎充実」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      sake: { type: 'integer', enum: [0, 1], description: '「日本酒充実」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      wine: { type: 'integer', enum: [0, 1], description: '「ワイン充実」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      card: { type: 'integer', enum: [0, 1], description: '「カード可」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      non_smoking: { type: 'integer', enum: [0, 1], description: '「禁煙席」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      charter: { type: 'integer', enum: [0, 1], description: '「貸切可」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      ktai: { type: 'integer', enum: [0, 1], description: '「携帯電話OK」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      parking: { type: 'integer', enum: [0, 1], description: '「駐車場あり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      barrier_free: { type: 'integer', enum: [0, 1], description: '「バリアフリー」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      sommelier: { type: 'integer', enum: [0, 1], description: '「ソムリエがいる」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      night_view: { type: 'integer', enum: [0, 1], description: '「夜景がキレイ」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      open_air: { type: 'integer', enum: [0, 1], description: '「オープンエア」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      show: { type: 'integer', enum: [0, 1], description: '「ライブ・ショーあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      equipment: { type: 'integer', enum: [0, 1], description: '「エンタメ設備」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      karaoke: { type: 'integer', enum: [0, 1], description: '「カラオケあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      band: { type: 'integer', enum: [0, 1], description: '「バンド演奏可」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      tv: { type: 'integer', enum: [0, 1], description: '「TV・プロジェクター」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      lunch: { type: 'integer', enum: [0, 1], description: '「ランチあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      midnight: { type: 'integer', enum: [0, 1], description: '「23時以降も営業」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      midnight_meal: { type: 'integer', enum: [0, 1], description: '「23時以降食事OK」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      english: { type: 'integer', enum: [0, 1], description: '「英語メニューあり」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      pet: { type: 'integer', enum: [0, 1], description: '「ペット可」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      child: { type: 'integer', enum: [0, 1], description: '「お子様連れOK」という条件で絞り込むかどうかを指定します。(0:絞り込まない（初期値）, 1:絞り込む)' },
      
      // Credit card filter
      credit_card: { 
        type: 'string', 
        description: 'クレジットカードの種別ごとに絞り込むことができます。複数指定可能 (key=value1,value2,...). (c01:VISA, c02:マスター, c04:アメックス, c06:DINERS, c07:JCB, c11:銀聯, c12:Discover)',
        enum: [
          'c01', 
          'c02', 
          'c04', 
          'c06', 
          'c07', 
          'c11', 
          'c12', 
        ]
      },
      
      // Response control
      order: {
        type: 'integer',
        description: '検索結果の並び順を指定します。 (1:店名かな順, 2:ジャンルコード順, 3:小エリアコード順, 4:おススメ順(初期値))',
        enum: [1, 2, 3, 4]
      },
      start: { type: 'integer', minimum: 1, description: '検索結果の何件目から出力するかを指定します。(初期値:1)' },
      count: { type: 'integer', minimum: 1, maximum: 100, description: '検索結果の最大出力データ数を指定します。(初期値:1、最小:1、最大:100)' },

      // SKIPPED for now
      // type: { 
      //   type: 'string', 
      //   description: 'レスポンス項目の項目数を指定できます。liteを指定すると、主要項目のみ出力されます。credit_card、specialを指定することで、クレジットカード、特集をレスポンスに付加できます。+でつないで指定することで、複数指定が可能です。例:type=credit_card+special (lite:主要項目のみ, credit_card:クレジットカード付加, special:特集付加, 指定なし:デフォルト)',
      //   enum: ['lite', 'credit_card', 'special', 'credit_card+special', 'lite+credit_card', 'lite+special']
      // },
      
      // Response format
      format: {
        type: 'string',
        description: 'レスポンスをXMLかJSONかを指定します。 (xml または json、初期値:xml)',
        enum: ['xml', 'json']
      },
    },
    // At least one primary search parameter is required
    anyOf: [
      { required: ['id'] },
      { required: ['name'] },
      { required: ['name_kana'] },
      { required: ['name_any'] },
      { required: ['tel'] },
      { required: ['address'] },
      { required: ['keyword'] },
      { required: ['large_service_area'] },
      { required: ['service_area'] },
      { required: ['large_area'] },
      { required: ['middle_area'] },
      { required: ['small_area'] },
      { required: ['genre'] },
      //{ required: ['lat', 'lng'] },
    ],
  },
};

export const TOOLS = [
  SEARCH_GOURMET_BY_ID,
  SEARCH_GOURMET_BY_NAME,
  SEARCH_GOURMET_BY_NAME_KANA,
  SEARCH_GOURMET_BY_NAME_ANY,
  SEARCH_GOURMET_BY_TEL,
  SEARCH_GOURMETS_BY_KEYWORD,
  SEARCH_GOURMETS_BY_GENRE,
  SEARCH_GOURMETS_BY_LARGE_SERVICE_AREA,
  SEARCH_GOURMETS_BY_SERVICE_AREA,
  SEARCH_GOURMETS_BY_LARGE_AREA,
  SEARCH_GOURMETS_BY_MIDDLE_AREA,
  SEARCH_GOURMETS_BY_SMALL_AREA,
  SEARCH_GOURMET_COMPREHENSIVE,
  // Master data tools
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
];
