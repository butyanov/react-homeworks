import { makeAutoObservable } from 'mobx';
import ItemService from "@/services/items-service";

interface Item {
    id: number;
    body: string;
}

class ItemStore {
    items : Item[] = [];
    isLoading = false;
    itemService;

    constructor() {
        makeAutoObservable(this);
        this.itemService = new ItemService();
    }

    setItems = (items : any) => {
        this.items = items;
    };

    setIsLoading = (status : any) => {
        this.isLoading = status;
    };

    getItems = () => {
        this.setIsLoading(true);
        this.itemService
            .getItems()
            .then((result: Item[]) => {
                this.setItems(result);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    };
}

const itemStore = new ItemStore();
export default itemStore;