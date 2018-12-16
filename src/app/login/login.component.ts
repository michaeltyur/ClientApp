import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {}

 login()
 {
   if(this.email.valid && this.password.valid)
   {
      this.authenticationService.login(this.email.value,this.password.value);
   }
 }
}
