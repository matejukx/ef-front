// class to handle api calls
import axios from 'axios';

export class Api {
    // get all items
    static getItems() {
        return axios.get('http://localhost:8080/items');
    }
    // get all clients
    static getClients() {
        return axios.get('http://localhost:8080/clients');
    }
    // get all internet clients
    static getInternetClients() {
        return axios.get('http://localhost:8080/internetclients');
    }
    // get all clients
    static getOrders() {
        return axios.get('http://localhost:8080/orders');
    }

}