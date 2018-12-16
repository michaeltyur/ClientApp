import {Queue} from './queue'

export class User{
    id?:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    phone:number;
    futureQueue?:Queue;
    pastQueues?:Array<Queue>;
    constructor(firstName:string,lastName:string,phone:number,email:string,password:string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.phone=phone;
        this.email=email;
        this.password=password;
    }
}