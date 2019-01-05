import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$:Observable<User[]>;
  users:User[];
  constructor(private userService:UserService) { 
    this.users=[];
    
  }
  
  ngOnInit() {
    this.users$=this.userService.getListOfUsers();
     this.userService.getListOfUsers().subscribe(querySnapshot=>
    {
           querySnapshot.forEach(doc=>
            {
              this.users.push(doc.data());
            })
    });
  }
  onSelectClient(client:User){
    if (client) {
      this.userService.onSelectedClientForUpdate(client);
    }
  }
}
