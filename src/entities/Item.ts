export interface Item {
    id: number;
    price: number;
    name: string;
    description: string;
    quantity: number;
}

export interface CreateItemResource {
    price: number;
    name: string;
    description: string;
    quantity: number;
}