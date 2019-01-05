import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { nameMinLength,
         nameMaxLength,
         phoneMinLength,
         phoneMaxLength} from '../../consts/validation.consts'
import { FormGroup,Validators,FormBuilder,FormControl } from '@angular/forms';
import { ValidatePhoneAsNumber } from 'src/app/validators/phone.validator';
import { ValidatePhoneNotExist } from 'src/app/validators/phone-notexists.validator';

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
  phonePrefixs:string[];
  selectedPrefix:string;
  mouseOvered:boolean;


  constructor(private fb: FormBuilder,private userService:UserService) { 

    this.selectedPrefix='050';

    this.client=userService.getSelectedClientForUpdate();
    if (this.client) {
      this.selectedPrefix=this.client.phone.substring(0, 3)
    }
    else this.client={firstName:'', lastName:'', email:'', phone:'', admin:false};

    this.nameMinLength=nameMinLength;
    this.nameMaxLength=nameMaxLength;
    this.phoneMinLength=phoneMinLength;
    this.phoneMaxLength=phoneMaxLength;
    this.phonePrefixs=['050','052','053','054','055','056'];
  }

  ngOnInit() {
    this.userForm=this.fb.group({
      firstName:[this.client.firstName, [Validators.required,
                      Validators.minLength(this.nameMinLength),
                      Validators.maxLength(this.nameMaxLength)]],
      lastName: [this.client.lastName, [Validators.required,
                      Validators.minLength(this.nameMinLength),
                      Validators.maxLength(this.nameMaxLength)]],
      email:    [this.client.email,  [ Validators.required,
                        Validators.email]],
      phone:    [this.client.phone.substring(3), [Validators.required,
                      Validators.minLength(this.phoneMinLength), 
                      Validators.maxLength(this.phoneMaxLength),
                      ValidatePhoneAsNumber ],
                      ValidatePhoneNotExist.createValidator(this.userService) ]  ,
      admin:    [{value: this.client.admin, disabled: true}]      
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
  get admin() {
    return this.userForm.get('admin');
  }
 onSelectPrefix(prefix:string):void{
   if (prefix) {
     this.selectedPrefix=prefix;
     this.userService.setPhonePrefix(this.selectedPrefix);
   }
  
 }
  addClient():void{
    if (this.userForm.valid) {
      let user = this.userForm.value as User;
      user.phone=this.selectedPrefix + this.phone.value;
      this.userService.addUser(user);
    }
  }
  updateClient():void{
    if (this.userForm.valid) {
      let user = this.userForm.value as User;
      user.phone=this.selectedPrefix + this.phone.value;
      this.userService.updateUser(user);
    }
  }
}
