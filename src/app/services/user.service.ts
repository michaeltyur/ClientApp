import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from, of } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Router, CanActivate } from '@angular/router';
import { EventEmitter } from 'events';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersCollectionRef: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;
  currentUser$:Observable<User>;
  collectionName:string;

  private userDoc: AngularFirestoreDocument<User>;
  

  constructor(private afs: AngularFirestore, private router: Router,private msgService:MessageService) {
    this.collectionName='users';
    this.usersCollectionRef = this.afs.collection(this.collectionName);
    this.users$ = this.usersCollectionRef.valueChanges();
    

    this.users$ = this.usersCollectionRef.snapshotChanges().pipe(map(actions =>
      {
          return actions.map(action=>
          {
            const data = action.payload.doc.data() as User;
            const id = action.payload.doc.id;
            return { id, ...data };
          })   
      }));
   }

  addUser(user:User ):void
  {
    if(user)
    {
     let res= this.getUser(user.email).then(res=>{
        if(!res)
        {
           this.usersCollectionRef.doc(user.email).set({firstName:user.firstName,
                                                        lastName:user.lastName,
                                                        email:user.email,
                                                        phone:user.phone,
                                                        admin:false})
           .then((complit)=>this.router.navigate(['home']),
                  (error)=>console.log(error));
        }
        else{
          this.msgService.sendMessage("alert-warning","this email is allready registered");
        }});
        
    }
   }

   getUser(email:string):Promise<any>{

    //  this.userDoc = this.afs.doc<User>('users/'+email);
    //  return this.userDoc.valueChanges();
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
      this.usersCollectionRef.doc(user.id).update(user);
    }
    
    deleteUser(user: User) {
      this.usersCollectionRef.doc(user.id).delete();
    }
  
}
