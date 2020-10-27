import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from "../../model/data-object/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      "userId": 16,
      "employeeId": "E001",
      "firstName": "Rushan",
      "lastName": "Nanayakkara",
      "email": "rushannana@gmail.com",
      "tenantId": 0,
      "status": true
  }
  ];

  constructor() { }

  getLoggedInUser(): Observable<User>{
    return of(this.users[0]);
  }


}
