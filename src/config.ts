import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import { consoleError } from './console.js';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

export const config = {
  API_KEY: process.env.HOTPEPPER_API_KEY || '',
  BASE_URL: 'http://webservice.recruit.co.jp/hotpepper',
  END_POINT: {
    GOURMET: '/gourmet/v1/',
    SHOP: '/shop/v1/',
    BUDGET: '/budget/v1/',
    LARGE_SERVICE_AREA: '/large_service_area/v1/',
    SERVICE_AREA: '/service_area/v1/',
    LARGE_AREA: '/large_area/v1/',
    MIDDLE_AREA: '/middle_area/v1/',
    SMALL_AREA: '/small_area/v1/',
    GENRE: '/genre/v1/',
    SPECIAL: '/special/v1/',
    SPECIAL_CATEGORY: '/special_category/v1/',
    CREDIT_CARD: '/credit_card/v1/',
  },
} as const;

// Ensure the API key is provided
if (!config.API_KEY) {
  //consoleError('API_KEY is not defined in environment variables');
  throw new Error(
    'API_KEY is not defined in environment variables. Get your API key at: https://webservice.recruit.co.jp/doc/hotpepper/',
  );
}

export default config;
