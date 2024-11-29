import axios, {AxiosRequestConfig} from 'axios';
import {Platform} from "react-native";

export default class AxiosClient {
    api; 

    constructor() {
        this.api = axios.create();
        this.api.defaults.baseURL = this.getDefaultBaseUrl();
        this.api.defaults.headers.common['App-Platform'] = Platform.OS;
        this.api.defaults.headers.common['Content-Type'] = 'application/json';
    }

    getDefaultBaseUrl = () => {
        return 'https://jsonplaceholder.typicode.com';
    };

    get = < T extends {}>(config: any) => {
        return this.api.get<T>(config.url, config.config);
    };
}