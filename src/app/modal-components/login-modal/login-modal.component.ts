import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { passwordMaxLength,passwordMinLength} from '../../consts/validation.consts'
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  userForm : FormGroup;
  passwordMaxLength:number;
  passwordMinLength:number;

  constructor(private fb: FormBuilder,
              private userService:UserService,
              private userAuth:AuthenticationService,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal) { 
      this.passwordMinLength=passwordMinLength
      this.passwordMaxLength=passwordMaxLength;
              }

  ngOnInit() {
    this.userForm=this.fb.group({
      email:    ["",  [ Validators.required,
                        Validators.email]],
      password:["",[Validators.required,Validators.minLength(this.passwordMinLength),
                    Validators.maxLength(this.passwordMaxLength)
      ]]
    })
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  login():void{
    if (this.userForm.valid) {
     let result = this.userAuth.login(this.email.value,this.password.value);
     result.then(res=>
      {
        if(res)
          this.activeModal.close('Close click');          
          else{
            this.userForm.setErrors({invalidLogin:true});
          }
      })

    }
  }
}
