import axios from 'axios';
import { Order, CreateOrderResource } from '../entities/Order';

export class OrdersApi {
    private static apiUrl = 'https://localhost:7011/api/';

    static getOrders() : Promise<Order[]> {
        return axios.get(this.apiUrl + 'orders').then(response => response.data);
    }

    static postOrder(order: CreateOrderResource) {
        return axios.post(this.apiUrl + 'orders', order);
    }

    static finishOrder(id: number) {
        return axios.post("https://localhost:7011/" + 'finish/' + id );
    }
}