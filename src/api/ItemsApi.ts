// class to handle api calls
import axios from 'axios';
import { CreateItemResource, Item } from '../entities/Item';

export class ItemsApi {
    private static apiUrl = 'https://localhost:7011/api/';

    // get all items
    static getItems() : Promise<Item[]> {
        return axios.get(this.apiUrl + 'items').then(response => response.data);
    }
    
    // post new item
    static postItem(item: CreateItemResource) {
        return axios.post(this.apiUrl + 'items', item);
    }

    // put item
    static updateQuantity(item: Item) {
        return axios.put('https://localhost:7011/add/' + item.id + '?quanity=' + item.quantity);
    }
}