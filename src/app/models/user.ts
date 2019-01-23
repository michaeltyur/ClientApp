import {Queue} from './queue';

export interface User {
    firstName: string;
    lastName?: string;
    email: string;
    password?: string;
    phone: string;
    admin: boolean;

}
