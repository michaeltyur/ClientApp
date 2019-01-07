import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router, CanActivate } from '@angular/router';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollectionRef: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;
  currentUser$:Observable<User>;

  userAdded$:EventEmitter<User>;
  userUpdated$:EventEmitter<User>;
  userDeleted$:EventEmitter<User>;

  private collectionName:string;
  private phonePrefix:string;

  private userDoc: AngularFirestoreDocument<User>;
  

  constructor(private afs: AngularFirestore, 
              private router: Router,
              private msgService:MessageService) {
    this.collectionName='users';
    this.userAdded$ = new EventEmitter<User>();
    this.userUpdated$ = new EventEmitter<User>();
    this.userDeleted$ = new EventEmitter<User>();
    this.usersCollectionRef = this.afs.collection(this.collectionName);
    this.users$ = this.usersCollectionRef.valueChanges();
    

    this.users$ = this.usersCollectionRef.snapshotChanges().pipe(map(actions =>
      {
          return actions.map(action=>
          {
            const data = action.payload.doc.data();
            const id = action.payload.doc.id;
            return { id, ...data };
          })   
      }));
   }
  setPhonePrefix(phonePrefix:string):void{
    if (phonePrefix) {
      this.phonePrefix=phonePrefix;
    }
  }
      
  addUser(user:User ):Promise<boolean>
  {
    if(user)
    {
      return this.getUser(user.email).then(res=>{
        if(!res)
        {
          //user.admin=false;
         // const userForDb=<User>user;
          return this.usersCollectionRef.doc(user.email).set(user)
           .then((complit)=>
           {
             this.msgService.sendMessage('alert-success',`user ${user.firstName} is added successfully`);
             return true;
             //this.router.navigate(['home']);
            })
            .catch(err=>{
              this.msgService.sendMessage("alert-warning","an error has occurred ");
              return false;
            });
            
        }
        else{
          this.msgService.sendMessage("alert-warning","this email is allready registered");
          return false;
        }});    
    }}


  getListOfUsers():Observable<any>{
    return this.usersCollectionRef
    .get();
  }

   getUser(email:string):Promise<any>{

      return this.usersCollectionRef
             .doc(email)
             .ref
             .get()
             .then(res=>
              {
                return res.data();
              });
   }
   

    updateUser(user: User):Promise<boolean> {
      if (user) {
       return this.usersCollectionRef
        .doc(user.email)
        .update(user)
        .then(ok=>
          {
            this.msgService.sendMessage('alert-success',`user ${user.firstName} is update successfully`);
            this.userUpdated$.emit(user);
            return true;
          })
        .catch(err=>
          {
            this.msgService.sendMessage("alert-warning","an error has occurred ");
            return false
          });
      }
      
    }
    
    deleteUser(user: User):Promise<boolean> {
      if (user) {
        let userForDelete=user;
       return this.usersCollectionRef.doc(user.email).delete()
        .then(res=>
          {
            this.userDeleted$.emit(user);
            this.msgService.sendMessage('alert-success',`user ${userForDelete.firstName} is deleted successfully`);
            return true;
            //this.router.navigate(['home']);
          })
        .catch(err=>
          {
            this.msgService.sendMessage("alert-warning","an error has occurred ");
            return false;
          });
      }
      
    }
  
     getPnoneNumber(phone:string){
      let fullNumber=this.phonePrefix + phone;
     return this.usersCollectionRef
        .ref
        .where("phone", "==", fullNumber)
        .get();
    }
}
