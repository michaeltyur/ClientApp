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
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userForm : FormGroup;
  nameMinLength:number;
  nameMaxLength:number;

  constructor(private userService:UserService,private fb: FormBuilder) { 
    this.nameMinLength=nameMinLength;
    this.nameMaxLength=nameMaxLength;
  }

  ngOnInit() {
    this.userForm=this.fb.group({
      firstName:['', [Validators.required,
                      Validators.minLength(nameMinLength),
                      Validators.maxLength(nameMaxLength)]],
      lastName: ['', [Validators.required,
                      Validators.minLength(nameMinLength),
                      Validators.maxLength(nameMaxLength)]],
      email:    ['',  Validators.required],
      password: ['', [Validators.required, 
                      Validators.minLength(passwordMinLength),
                      Validators.maxLength(passwordMaxLength)]],
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
get password() {
    return this.userForm.get('password');
  }
  get phone() {
    return this.userForm.get('phone');
  }

  registration():void{
    if(this.userForm.valid)
    {
      this.userService.addUser(this.userForm.value);
    }
}
}
