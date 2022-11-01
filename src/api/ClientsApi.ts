import axios from 'axios';
import { Client, CreateClientResource } from '../entities/Client';

export class ClientsApi {
    private static apiUrl = 'https://localhost:7011/api/';

    static getClients() : Promise<Client[]> {
        return axios.get(this.apiUrl + 'clients').then(response => response.data);
    }
    
    static postClient(client: CreateClientResource) {
        return axios.post(this.apiUrl + 'clients', client);
    }

    static updateClient(client: Client) {
        return axios.put(this.apiUrl + 'clients/' + client.id, client);
    }
    
    static getClientByName(name: string) : Promise<Client> {
        return axios.get(this.apiUrl + 'clients/name/' + name).then(response => response.data);
    }

}