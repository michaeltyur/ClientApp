import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { ClientSelectComponent } from 'src/app/modal-components/client-select/client-select.component';
import { ClientModalComponent } from 'src/app/modal-components/client-modal/client-modal.component';
import { LoginModalComponent } from 'src/app/modal-components/login-modal/login-modal.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthenticationService,
              private modalService: NgbModal) {
    authService.currentUserEmitter$.subscribe(res => this.currentUser = res);
   }

  ngOnInit() {
  }
  logout(): void {
    this.authService.logout();
  }
  goToNewUser(): void {
    if (this.currentUser.admin) {
      const modalRef = this.modalService.open(ClientModalComponent, {centered: true});
      modalRef.componentInstance.client = {firstName: '', lastName: '', email: '', phone: '', admin: false};
    }

  }
  goToLogin(): void {
    const modalRef = this.modalService.open(LoginModalComponent, {centered: true});
  }
}
