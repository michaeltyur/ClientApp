import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';
import { CalendarEvent } from 'calendar-utils';


@Injectable({
  providedIn: 'root'
})
export class CalendarEventService {

  private usersCollectionRef: AngularFirestoreCollection<CalendarEvent>
  private collectionName:string;

  constructor(private msgService:MessageService) {
    this.collectionName="calendarevent";
   }

   addCalendarEvent(event:CalendarEvent ):Promise<boolean>
  {
    if(event)
    {
       return this.usersCollectionRef
       .doc(event.start.toString())
       .ref
       .get().then(res=>
        {
          if(!res.data)
          {
            this.usersCollectionRef
            .doc(event.start.toString())
            .set(event)
            .then(complit=>{
               this.msgService.sendMessage('alert-success',`event is added successfully`);
               return true;
            })
            .catch(error=>{
              this.msgService.sendMessage("alert-warning","an error has occurred ");
              return false;
            })
            
          }
          else
          {
            this.msgService.sendMessage("alert-warning","an event in this time allready registered");
            return false;
          }
        });    
    }}

    getCalendarEventByClient(){

    }
    getCalendarEventByDay(){
      
    }
}
