import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  firstName = new FormControl('');
  lastName= new FormControl('');
  email = new FormControl('');
  password = new FormControl('');
  phone = new FormControl('');
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  registration():void{
    if(this.firstName.valid&&this.lastName.valid&&this.email.valid&&this.password.valid)
    {

      this.userService.addUser(new User(this.firstName.value,this.lastName.value,this.phone.value,this.email.value,this.password.value));
    }
}
}
