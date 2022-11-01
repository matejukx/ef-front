// class to handle api calls
import axios from 'axios';
import { Client, CreateClientResource } from '../entities/Client';

export class ClientsApi {
    private static apiUrl = 'https://localhost:7011/api/';

    // get all clients
    static getClients() : Promise<Client[]> {
        return axios.get(this.apiUrl + 'clients').then(response => response.data);
    }
    
    // post new client
    static postClient(client: CreateClientResource) {
        return axios.post(this.apiUrl + 'clients', client);
    }

    // put client
    static updateClient(client: Client) {
        return axios.put(this.apiUrl + 'clients/' + client.id, client);
    }
    
    // get client by name
    static getClientByName(name: string) : Promise<Client> {
        return axios.get(this.apiUrl + 'clients/name/' + name).then(response => response.data);
    }

}