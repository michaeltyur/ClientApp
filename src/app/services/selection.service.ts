import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalComponent } from '../modal-components/client-modal/client-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private selectedClientForCalendarEmitter$:EventEmitter<User>;

  private selectedClientForUpdate:User;
  
  constructor(private router: Router,
              private msgService:MessageService) { }

  onSelectedClientForUpdate(client:User){
    if (client) {
     this.selectedClientForUpdate=client;
    }
 }
 getSelectedClientForUpdate():User{
    return this.selectedClientForUpdate;
 }
 emitUserforCalendar(client:User){
   if (client) {
     this.selectedClientForCalendarEmitter$.emit(client)
   }
  }
}
