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

  private selectedClient:User;
  private collectionName:string;
  private phonePrefix:string;

  private userDoc: AngularFirestoreDocument<User>;
  

  constructor(private afs: AngularFirestore, private router: Router,private msgService:MessageService) {
    this.collectionName='users';

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
  onSelectedClient(client:User){
     if (client) {
      this.selectedClient=client;
      this.router.navigate(['user']);
     }
  }
  getSelectedClient():User{
     return this.selectedClient;
  }

  addUser(user:User ):void
  {
    if(user)
    {
      let res= this.getUser(user.email).then(res=>{
        if(!res)
        {
          user.admin=false;
          const userForDb=<User>user;
           this.usersCollectionRef.doc(userForDb.email).set(userForDb)
           .then((complit)=>this.router.navigate(['home']),
                  (error)=>console.log(error));
        }
        else{
          this.msgService.sendMessage("alert-warning","this email is allready registered");
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
   

    updateUser(user: User) {
      if (user) {
        this.usersCollectionRef.doc(user.id).update(user);
      }
      
    }
    
    deleteUser(user: User) {
      if (user) {
        this.usersCollectionRef.doc(user.id).delete();
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
