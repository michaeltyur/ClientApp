import{Pipe, PipeTransform,Component} from '@angular/core'

@Pipe({
    name:'capitalizeFirstLetter'
})

export class TitlePipe implements PipeTransform
{
    transform(title){

        if( title )
        {

          title = title.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
          return title;
        }
        else return title;
        
    }
}