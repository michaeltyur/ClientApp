import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { nameMinLength,
         nameMaxLength,
         phoneMinLength,
         phoneMaxLength,
         passwordMinLength,
         passwordMaxLength } from '../../consts/validation.consts'
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  client:User;
  userForm : FormGroup;
  nameMinLength:number;
  nameMaxLength:number;
  phoneMinLength:number;
  phoneMaxLength:number;


  constructor(private fb: FormBuilder,private userService:UserService) { 
    this.nameMinLength=nameMinLength;
    this.nameMaxLength=nameMaxLength;
    this.phoneMinLength=phoneMinLength;
    this.phoneMaxLength=phoneMaxLength;
  }

  ngOnInit() {
    this.userForm=this.fb.group({
      firstName:['', [Validators.required,
                      Validators.minLength(nameMinLength),
                      Validators.maxLength(nameMaxLength)]],
      lastName: ['', [Validators.required,
                      Validators.minLength(nameMinLength),
                      Validators.maxLength(nameMaxLength)]],
      email:    ['',  [ Validators.required,
                        Validators.email]],
      phone:    ['', [Validators.required, 
                      Validators.minLength(phoneMinLength),
                      Validators.maxLength(phoneMaxLength)]]
    });
  }
  get firstName() {
    return this.userForm.get('firstName');
  }
get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phone() {
    return this.userForm.get('phone');
  }

  addClient():void{
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
    }
  }
}
