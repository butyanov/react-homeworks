import AxiosClient from './axios-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalClient {
    apiClient: AxiosClient;

    constructor() {
        this.apiClient = new AxiosClient();
    }

    async fetchData(url: string) {
        try {
            // Получаем данные из удаленного API
            const response = await this.apiClient.get({ url });
            const data = response.data;

            // Сохраняем данные в AsyncStorage, используя уникальное имя url как ключ
            await AsyncStorage.setItem(url, JSON.stringify(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async getData(url: string) {
        try {
            const jsonData = await AsyncStorage.getItem(url);
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error('Error getting data from storage:', error);
            return null;
        }
    }

    async clearData(url: string) {
        try {
            await AsyncStorage.removeItem(url);
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    }
}

export default LocalClient;