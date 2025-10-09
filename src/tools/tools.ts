import { Tool } from '@modelcontextprotocol/sdk/types.js';

/**
 * Search scenarios and their parameters
 * 3 types of searches: 
 * - 1. One shot (e.g, I already know what I want)
 * - 2. Exploration (e.g., I have no idea what I want to filter out)
 * - 3. Recommendation (e.g., There are available recommend for me to choose from)
 * ### Type 1:
 * 1. Search by id, name, name_kana, name_any, tel
 * ### Type 2:
 * 2.1 Search by service area SA  + optional filters
 * 2.2 Search by large area Z + optional filters
 * 2.3 Search by middle area Y + optional filters
 * 2.4 Search by small area X + optional filters
 * ### Type 3:
 * 3.1 Search by special recommend
 * 3.2 Search by special_category recommend
 * 3.3 Search by budget recommend
 * 3.4 Search by genre recommend
 */

// Reusable parameter schemas
export const COMMON_OPTIONAL_PARAMS = {
  // Optional parameters
  // Additional filters
  party_capacity: { 
    type: 'integer', 
    description: '宴会収容人数で絞り込むことができます。指定数より大きな収容人数のお店を検索します (例: 50)',
    minimum: 1
  },

  // Facility filters
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
} as const;


 /**
  * Fuzzy search by any keyword
  * 店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。
  * 文字コードはUTF8。半角スペース区切りの文字列を渡すことでAND検索になる。
  * 複数指定可能*2
  * *2: keyword=value1&keyword=value2&...または keyword=value1,value2,...
  **/
export const SEARCH_GOURMETS_BY_KEYWORD: Tool = {
  name: 'search_gourmets_by_keyword',
  description: 'Search gourmets by keyword, name, tel, address, or id. At least one of these parameters is required.',
  inputSchema: {
    type: 'object',
    properties: {
      // Type 1: One shot
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
      ...COMMON_OPTIONAL_PARAMS,

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
    ],
  },
};

export const SEARCH_GOURMETS_BY_AREA: Tool = {
  name: 'search_gourmets_by_area',
  description: 'Search gourmets by geographical areas like service area, large area, middle area, or small area.',
  inputSchema: {
    type: 'object',
    properties: {
      // Type 2: Exploration
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
      ...COMMON_OPTIONAL_PARAMS,
    },
    // At least one primary search parameter is required
    anyOf: [
      { required: ['large_service_area'] },
      { required: ['service_area'] },
      { required: ['large_area'] },
      { required: ['middle_area'] },
      { required: ['small_area'] },
      //{ required: ['lat', 'lng'] },
    ],
  },
};

export const SEARCH_GOURMETS_BY_RECOMMEND: Tool = {
  name: 'search_gourmets_by_recommend',
  description: 'Search gourmets by recommendations like genre, budget, or special categories.',
  inputSchema: {
    type: 'object',
    properties: {

      // Type 3: Recommendation 
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

      ...COMMON_OPTIONAL_PARAMS,
    },
    // At least one primary search parameter is required
    anyOf: [
      { required: ['special'] },
      { required: ['special_or'] },
    ],
  },
};


export const TOOLS = [
  SEARCH_GOURMETS_BY_KEYWORD,
  SEARCH_GOURMETS_BY_AREA,
  SEARCH_GOURMETS_BY_RECOMMEND,
];
