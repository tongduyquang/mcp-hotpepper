import axios from 'axios';
import { config } from './config.js';
import { handleApiError } from './errors.js';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Accept': 'application/json',
  }
});

export async function fetchData(endpoint: string, params: Record<string, string>): Promise<any> {
  const url = `${config.BASE_URL}${endpoint}`;

  console.log(`Fetching data from URL: ${url} with params:`, params);
  try {
    // Sample: http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=[APIキー]&lat=34.67&lng=135.52&range=5&order=4
    const response = await apiClient.get(endpoint, { 
      params: { ...params, key: config.API_KEY } 
    });

    console.log('Fetched data successfully!');
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'fetchData');
  }
}
