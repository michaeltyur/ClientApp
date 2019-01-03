import {Queue} from './queue'

export interface User{
    id?:string;
    firstName:string;
    lastName?:string;
    email:string;
    password?:string;
    phone:string;
    admin:boolean;
       
}