// class to handle api calls
import axios from 'axios';
import { Order, CreateOrderResource } from '../entities/Order';

export class OrdersApi {
    private static apiUrl = 'https://localhost:7011/api/';

    // get all orders
    static getOrders() : Promise<Order[]> {
        return axios.get(this.apiUrl + 'orders').then(response => response.data);
    }

    // post new order
    static postOrder(order: CreateOrderResource) {
        return axios.post(this.apiUrl + 'orders', order);
    }
}