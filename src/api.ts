import axios from 'axios';
import { config } from './config.js';
import { handleApiError } from './errors.js';
// import { consoleLog } from './console.js';
// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    Accept: 'application/json',
  },
});

export async function fetchData(
  endpoint: string,
  params: Record<string, string>,
): Promise<any> {
  //const url = `${config.BASE_URL}${endpoint}`;

  //consoleLog(
  //   `Fetching data from URL: ${url} with params: ${JSON.stringify(params)}`,
  // );
  try {
    const response = await apiClient.get(endpoint, {
      params: { ...params, key: config.API_KEY },
    });

    //consoleLog('Fetched data successfully!');
    return response.data;
  } catch (error) {
    throw handleApiError(error, 'fetchData');
  }
}
