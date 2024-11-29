import { makeAutoObservable } from 'mobx';
import ApiRepository from '@/repositories/api-repository';

interface Item {
    id: number;
    body: string;
}

class ItemStore {
    items: Item[] = [];
    isLoading = false;
    apiRepository: ApiRepository;
    url = '/posts';

    constructor() {
        makeAutoObservable(this);
        this.apiRepository = new ApiRepository();
    }

    setItems = (items: Item[]) => {
        this.items = items;
    };

    setIsLoading = (status: boolean) => {
        this.isLoading = status;
    };

    fetchItems = async () => {
        this.setIsLoading(true);
        try {
            await this.apiRepository.fetchAndStoreData(this.url);
            
            const storedItems = await this.apiRepository.getStoredData(this.url);
            if (storedItems) {
                this.setItems(storedItems);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            this.setIsLoading(false);
        }
    };

    clearItems = async () => {
        try {
            await this.apiRepository.clearStoredData(this.url);
            this.setItems([]);
        } catch (error) {
            console.error('Error clearing items:', error);
        }
    };
}

const itemStore = new ItemStore();
export default itemStore;