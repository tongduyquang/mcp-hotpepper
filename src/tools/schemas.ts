import { z } from 'zod';

// Common optional parameters schema used across all search types
const CommonOptionalParamsSchema = z.object({
  // Pagination
  count: z.number().min(1).max(100).optional().default(10),
  start: z.number().min(1).optional().default(1),
  order: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).optional(), // 1:店名かな順, 2:ジャンルコード順, 3:小エリアコード順, 4:おススメ順(初期値)
  
  // Party capacity
  party_capacity: z.number().min(1).optional(),
  
  // Facility filters (all boolean-like integers)
  ktai_coupon: z.union([z.literal(0), z.literal(1)]).optional(),
  wifi: z.union([z.literal(0), z.literal(1)]).optional(),
  wedding: z.union([z.literal(0), z.literal(1)]).optional(),
  course: z.union([z.literal(0), z.literal(1)]).optional(),
  free_drink: z.union([z.literal(0), z.literal(1)]).optional(),
  free_food: z.union([z.literal(0), z.literal(1)]).optional(),
  private_room: z.union([z.literal(0), z.literal(1)]).optional(),
  horigotatsu: z.union([z.literal(0), z.literal(1)]).optional(),
  tatami: z.union([z.literal(0), z.literal(1)]).optional(),
  cocktail: z.union([z.literal(0), z.literal(1)]).optional(),
  shochu: z.union([z.literal(0), z.literal(1)]).optional(),
  sake: z.union([z.literal(0), z.literal(1)]).optional(),
  wine: z.union([z.literal(0), z.literal(1)]).optional(),
  card: z.union([z.literal(0), z.literal(1)]).optional(),
  non_smoking: z.union([z.literal(0), z.literal(1)]).optional(),
  charter: z.union([z.literal(0), z.literal(1)]).optional(),
  ktai: z.union([z.literal(0), z.literal(1)]).optional(),
  parking: z.union([z.literal(0), z.literal(1)]).optional(),
  barrier_free: z.union([z.literal(0), z.literal(1)]).optional(),
  sommelier: z.union([z.literal(0), z.literal(1)]).optional(),
  night_view: z.union([z.literal(0), z.literal(1)]).optional(),
  open_air: z.union([z.literal(0), z.literal(1)]).optional(),
  show: z.union([z.literal(0), z.literal(1)]).optional(),
  equipment: z.union([z.literal(0), z.literal(1)]).optional(),
  karaoke: z.union([z.literal(0), z.literal(1)]).optional(),
  band: z.union([z.literal(0), z.literal(1)]).optional(),
  tv: z.union([z.literal(0), z.literal(1)]).optional(),
  lunch: z.union([z.literal(0), z.literal(1)]).optional(),
  midnight: z.union([z.literal(0), z.literal(1)]).optional(),
  midnight_meal: z.union([z.literal(0), z.literal(1)]).optional(),
  english: z.union([z.literal(0), z.literal(1)]).optional(),
  pet: z.union([z.literal(0), z.literal(1)]).optional(),
  child: z.union([z.literal(0), z.literal(1)]).optional(),
  
  // Credit card
  credit_card: z.enum(['c01', 'c02', 'c04', 'c06', 'c07', 'c11', 'c12']).optional(),
  
  // Response format
  format: z.enum(['xml', 'json']).optional().default('json'),
}).partial();

// Schema for comprehensive keyword search (SEARCH_GOURMETS_BY_KEYWORD)
export const SearchGourmetComprehensiveInputSchema = CommonOptionalParamsSchema.extend({
  // Primary search parameters (at least one required)
  id: z.string().max(20).optional(),
  name: z.string().optional(),
  name_kana: z.string().optional(),
  name_any: z.string().optional(),
  tel: z.string().optional(),
  address: z.string().optional(),
  keyword: z.string().optional(),
}).refine(
  (data) => {
    // At least one primary search parameter is required
    return !!(data.id || data.name || data.name_kana || data.name_any || data.tel || data.address || data.keyword);
  },
  {
    message: "At least one search parameter is required: id, name, name_kana, name_any, tel, address, or keyword",
  }
);

// Schema for area-based search (SEARCH_GOURMETS_BY_AREA)
export const SearchGourmetsByAreaInputSchema = CommonOptionalParamsSchema.extend({
  // Area parameters (at least one required)
  large_service_area: z.enum(['SS10', 'SS20', 'SS30', 'SS40', 'SS50', 'SS60', 'SS70', 'SS80', 'SS90']).optional(),
  service_area: z.string().max(3).optional(),
  large_area: z.string().max(3).optional(),
  middle_area: z.string().max(5).optional(),
  small_area: z.string().max(5).optional(),
}).refine(
  (data) => {
    // At least one area parameter is required
    return !!(data.large_service_area || data.service_area || data.large_area || data.middle_area || data.small_area);
  },
  {
    message: "At least one area parameter is required: large_service_area, service_area, large_area, middle_area, or small_area",
  }
);

// Schema for recommendation-based search (SEARCH_GOURMETS_BY_RECOMMEND)
export const SearchGourmetsByRecommendInputSchema = CommonOptionalParamsSchema.extend({
  // Recommendation parameters
  genre: z.enum(['G001', 'G002', 'G003', 'G004', 'G005', 'G006', 'G007', 'G008', 'G017', 'G009', 'G010', 'G011', 'G012', 'G013', 'G016', 'G014', 'G015']).optional(),
  budget: z.enum(['B009', 'B010', 'B011', 'B001', 'B002', 'B003', 'B008', 'B004', 'B005', 'B006', 'B012', 'B013', 'B014']).optional(),
  special: z.string().optional(),
  special_or: z.string().optional(),
  special_category: z.string().optional(),
  special_category_or: z.string().optional(),
}).refine(
  (data) => {
    // At least one recommendation parameter is required
    return !!(data.genre || data.budget || data.special || data.special_or || data.special_category || data.special_category_or);
  },
  {
    message: "At least one recommendation parameter is required: genre, budget, special, special_or, special_category, or special_category_or",
  }
);

// Type exports for TypeScript usage
export type SearchGourmetComprehensiveInput = z.infer<typeof SearchGourmetComprehensiveInputSchema>;
export type SearchGourmetsByAreaInput = z.infer<typeof SearchGourmetsByAreaInputSchema>;
export type SearchGourmetsByRecommendInput = z.infer<typeof SearchGourmetsByRecommendInputSchema>;