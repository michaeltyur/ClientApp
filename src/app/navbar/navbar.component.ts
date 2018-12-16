import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { MessageService } from '../services/message.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser:User;
  
  constructor(private authService: AuthenticationService) {
    authService.currentUserEmitter$.subscribe(res=>this.currentUser=res);
   }

  ngOnInit() {
  }
  logout():void{
    this.authService.logout();
  }
}
