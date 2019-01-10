import{Pipe, PipeTransform,Component} from '@angular/core'
import { NailWork } from '../models/client-service';

@Pipe({
    name:'servicesArrayToTitle'
})

export class ServicesTitlePipe implements PipeTransform
{
    transform(servicesArray:NailWork[]){

        if( servicesArray.length )
        {
            let title="";
            servicesArray.forEach(service => {
               title+=service.serviceType;
               title+=',';
           });

          if(title[title.length-1]===',') 
           title= title.substring(0, title.length - 1);
          return title;
        }
        else return "N/A";
        
    }
}