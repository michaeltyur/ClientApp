import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { SelectionService } from 'src/app/services/selection.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientSelectComponent } from 'src/app/modal-components/client-select/client-select.component';
import { ClientModalComponent } from 'src/app/modal-components/client-modal/client-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  users: User[];
  constructor(private userService: UserService,
              private selectedService: SelectionService,
              private modalService: NgbModal) {
    this.users = [];

  }

  ngOnInit() {
    this.users$ = this.userService.getListOfUsers();
     this.userService.getListOfUsers().subscribe(querySnapshot => {
           querySnapshot.forEach(doc => {
              this.users.push(doc.data());
            });
    });
  }
  onSelectClient(client: User) {
    if (client) {
      const modalRef = this.modalService.open(ClientModalComponent, {centered: true});
      modalRef.componentInstance.client = client;
      // this.selectedService.onSelectedClientForUpdate(client);
    }
  }
  addClientLocaly(client: User): void {
     if (client) {
      this.users.push(client);
     }
  }
  updateClientLocaly(client: User): void {
    if (client) {
      const index = this.users.indexOf(client);
     if (index > -1) {
      this.users[index] = client;
     }
    }
 }
 deleteClientLocaly(client: User): void {
  if (client) {
    const index = this.users.indexOf(client);
   if (index > -1) {
    this.users.splice(index, 1);
   }
  }
}
}
