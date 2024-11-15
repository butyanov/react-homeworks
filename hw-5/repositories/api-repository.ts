import AxiosClient from "@/clients/axios-client";

export default class ItemRepository { 
    apiClient;
    constructor() {
        this.apiClient = new AxiosClient();
    }
    getItems = () => {
        return this.apiClient.get({ url: '/posts' });
    };
    changeItem = (item: any) => { return this.apiClient.post({
        url: '/posts/1',
        data: item });
    }; }