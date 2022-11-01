// create Client class
export interface Client {
    id: number;
    name: string;
    address: string;
}

export interface CreateClientResource {
    name: string;
    address: string;
    ipAddress: string;
}
