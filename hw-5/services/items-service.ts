import ItemRepository from "@/repositories/api-repository";

export default class ItemService {
    itemRepository; // private

    constructor() {
        this.itemRepository = new ItemRepository();
    }

    getItems = async () : Promise<any> => {
        const res = await this.itemRepository.getItems();
        return res.data;
    };
}