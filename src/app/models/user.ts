import {Queue} from './queue'

export class User{
    id?:string;
    firstName:string;
    lastName?:string;
    email:string;
    password?:string;
    phone:number;
    admin:boolean;
    constructor(firstName:string,lastName:string,phone:number,email:string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.phone=phone;
        this.email=email;     
        this.admin=false;
    }
}