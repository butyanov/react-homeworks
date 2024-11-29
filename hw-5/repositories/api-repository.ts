import LocalClient from '@/clients/local-client';

class ApiRepository {
    localClient: LocalClient;

    constructor() {
        this.localClient = new LocalClient();
    }

    async fetchAndStoreData(url: string) {
        await this.localClient.fetchData(url);
    }

    async getStoredData(url: string) {
        return await this.localClient.getData(url);
    }

    async clearStoredData(url: string) {
        await this.localClient.clearData(url);
    }
}

export default ApiRepository;