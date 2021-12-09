import { Authority } from "./authority";

export interface User {
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    enabled: boolean,
    profile: string,
    authorities: Authority[]
}
