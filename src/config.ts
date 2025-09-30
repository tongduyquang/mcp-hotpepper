import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
    API_KEY: process.env.HOTPEPPER_API_KEY || '',
    BASE_URL: 'http://webservice.recruit.co.jp/hotpepper',
    END_POINT: {
        GOURMET: '/gourmet/v1/',
        SHOP: '/shop/v1/',
    }

} as const;

// Ensure the API key is provided
if (!config.API_KEY) {
    console.error('API_KEY is not defined in environment variables');
    throw new Error('API_KEY is not defined in environment variables. Get your API key at: https://webservice.recruit.co.jp/doc/hotpepper/');
}

export default config;