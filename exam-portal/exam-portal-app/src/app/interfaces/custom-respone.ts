import { User } from "./user";

export interface CustomRespone<T> {
    timestamp: Date;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: { users?: T[], user?: T}
}
