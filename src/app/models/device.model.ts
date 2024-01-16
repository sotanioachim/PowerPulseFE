import { User } from "./user.model";

export interface Device{
    deviceId?: number;
    name?: string;
    type?: string;
    user?: User;
    maxConsumption?: number
}