import axios from 'axios';
import { CreateItemResource, Item } from '../entities/Item';

export class ItemsApi {
    private static apiUrl = 'https://localhost:7011/api/';

    static getItems() : Promise<Item[]> {
        return axios.get(this.apiUrl + 'items').then(response => response.data);
    }
    
    static postItem(item: CreateItemResource) {
        return axios.post(this.apiUrl + 'items', item);
    }

    static updateQuantity(item: Item) {
        return axios.put('https://localhost:7011/add/' + item.id + '?quanity=' + item.quantity);
    }
}