import { Injectable, EventEmitter } from '@angular/core';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 message: string;
 messageEmitter$: EventEmitter<Alert>;

  constructor() {
    this.messageEmitter$ = new EventEmitter();
   }
   sendMessage(type: string, message: string) {
     const alert = new Alert(type, message);
     this.messageEmitter$.emit(alert);
   }
}
