import { Client } from "./Client";

export interface InternetClient extends Client {
    ipAddress: string;
}