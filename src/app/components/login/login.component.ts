import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { passwordMinLength,passwordMaxLength} from '../../consts/validation.consts'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userForm : FormGroup;
  passwordMinLength:number;
  passwordMaxLength:number;

  constructor(private authenticationService: AuthenticationService,
              private fb: FormBuilder) { 
    this.passwordMinLength=passwordMinLength;
    this.passwordMaxLength=passwordMaxLength;
  }

  ngOnInit() {
    this.userForm=this.fb.group({
      email:    ['',   Validators.required],
      password: ['', [ Validators.required, 
                       Validators.minLength(passwordMinLength),
                       Validators.maxLength(passwordMaxLength)]],
    })
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

 login()
 {
   if(this.userForm.valid)
   {
      this.authenticationService.login(this.email.value,this.password.value);
   }
 }
}
