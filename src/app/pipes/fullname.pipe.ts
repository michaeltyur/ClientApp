import{Pipe, PipeTransform,Component} from '@angular/core'
import { NailWork } from '../models/client-service';
import { User } from '../models/user';

@Pipe({
    name:'fullNamePipe'
})

export class FullNamePipe implements PipeTransform
{
    transform(client:User){

        if( client)
        {
            let fullName="";

           fullName=(client.lastName) ? `${client.firstName} ${client.lastName}` : client.firstName;

          return fullName;
        }
        else return "N/A";
        
    }
}