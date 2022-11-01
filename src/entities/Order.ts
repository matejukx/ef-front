import { Client } from "./Client";
import { Item } from "./Item";

export interface Order {
    id: number;
    clientId: number;
    client: Client;
    items: OrderedItem[];
    isFinished: boolean;
    totalPrice: number;
    totalQuantity: number;
    isInternet: boolean;
}

export interface OrderedItem {
    id: number;
    item: Item;
    quantity: number;
    orderId: number;
}

export interface CreateOrderResource {
    clientId: number;
    items: Item[];
    isInternet: boolean;
}

export interface InternetOrder extends Order {
    ipAddress: string;
}

export interface CreateInternetOrderResource extends CreateOrderResource {
    ipAddress: string;
}