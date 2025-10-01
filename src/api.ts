import axios from 'axios';
import { config } from './config.js';

export async function fetchData(endpoint: string, params: Record<string, string>): Promise<any> {
    const url = `${config.BASE_URL}${endpoint}`;

    console.log(`Fetching data from URL: ${url} with params:`, params);
    try {
        // Sample: http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=[APIキー]&lat=34.67&lng=135.52&range=5&order=4
        const response = await axios.get(url, { params: { ...params, key: config.API_KEY } });
        
        console.log('Response data:', response.data);
        
        if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
        }   

        const data = response.data;
        console.log('Fetched data:', data);
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
