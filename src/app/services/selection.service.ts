import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientModalComponent } from '../modal-components/client-modal/client-modal.component';
import { NailWork } from '../models/client-service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  public selectedClientForCalendarEmitter$: EventEmitter<User>;
  public selectedServicesForCalendarEmitter$: EventEmitter<NailWork[]>;

  private selectedClientForUpdate: User;

  constructor(private router: Router,
              private msgService: MessageService) {

    this.selectedClientForCalendarEmitter$ = new EventEmitter<User>();
    this.selectedServicesForCalendarEmitter$ = new EventEmitter<NailWork[]>();
 }

  onSelectedClientForUpdate(client: User) {
    if (client) {
     this.selectedClientForUpdate = client;
    }
 }

 getSelectedClientForUpdate(): User {
    return this.selectedClientForUpdate;
 }

 emitUserForCalendar(client: User) {
   if (client) {
     this.selectedClientForCalendarEmitter$.emit(client);
   }
 }

 emitServicesForCalendar(services: NailWork[]) {
  if (services) {
    this.selectedServicesForCalendarEmitter$.emit(services);
  }
}

}
