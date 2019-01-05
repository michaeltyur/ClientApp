import { Component, Input ,OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NailWork } from 'src/app/models/client-service';
import { NailserviceService } from 'src/app/services/nailservice.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.css']
})
export class ClientSelectComponent implements OnInit {

  clients:User[];

  constructor(public activeModal: NgbActiveModal,private userService:UserService) {
    this.clients=[];
  }
  
  ngOnInit() {
    this.userService.getListOfUsers().subscribe(querySnapshot=>
      {
             querySnapshot.forEach(doc=>
              {
                this.clients.push(doc.data());
              })
      });
  }
  onSelectClient(client:User):void{
    if (client) {
      this.userService.emitUserforCalendar(client);
    }
  }
}
