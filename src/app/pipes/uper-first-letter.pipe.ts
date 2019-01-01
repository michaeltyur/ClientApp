import{Pipe, PipeTransform,Component} from '@angular/core'

@Pipe({
    name:'capitalizeFirstLetter'
})

export class UperFirstLetterPipe implements PipeTransform
{
    transform(name){

        if( name )
        {

            name = name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
          return name;
        }
        else return name;
        
    }
}