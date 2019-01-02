import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Alert } from '../../models/alert';
import { interval } from 'rxjs';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 
  message:Alert;

  constructor(private msgService:MessageService) {
    msgService.messageEmitter$.subscribe(res=>
      {
        this.message=res;
    
        setTimeout(()=>
        {
           this.hideAlert();
        }, 2000);
      });
   }

  ngOnInit() {
  }

  hideAlert():void{
    this.message=null;
  }
}
