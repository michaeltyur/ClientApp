import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument  } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userListEmitter$:EventEmitter<User[]>;
  currentUserEmitter$:EventEmitter<User>;
  currentUser:User;

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;

  constructor(private afs: AngularFirestore, 
              private router: Router,
              private msgService: MessageService,
              private userService:UserService) {

      this.userListEmitter$=new EventEmitter();
      this.currentUserEmitter$=new EventEmitter();
   }
   isAdmin():boolean{
     return this.currentUser && this.currentUser.admin ? true : false;

   }
  getCurrentUser():User{
   return this.currentUser;
  }
   login(email:string,password:string):void{

    this.userService.getUser(email).then(user=>
      {      
        if (user) {
          if (user.password==password) 
          {
            this.msgService.sendMessage("alert-success","login is successful");
            this.currentUser=user;
            this.currentUserEmitter$.emit(this.currentUser);
            this.router.navigate(['home']);
          }
          else
          {
            this.msgService.sendMessage("alert-warning","password is incorrect");
          }
        }
        else this.msgService.sendMessage("alert-warning",'user not found');
      });
   }

   logout():void{
     this.msgService.sendMessage("alert-warning",`user ${this.currentUser.firstName} is exited`);
     this.currentUser=undefined;
     this.currentUserEmitter$.emit(this.currentUser);
     this.router.navigate(['home']);
   }
}
