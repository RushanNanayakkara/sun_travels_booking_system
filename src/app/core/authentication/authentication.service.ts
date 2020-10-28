import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/data-object/User';
import { BASE_URL } from 'src/app/constants/url';
import { TokenResponse } from 'src/app/shared/models/responses/TokenResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  employeeAuth:string = "https://run.mocky.io/v3/61b4d206-4910-4c36-a2c7-73b80a0aa6e6";
  adminAuth:string = "https://run.mocky.io/v3/f2de0866-d65c-4293-ae4e-eb7944e13626";

  constructor(
    private http: HttpClient,
    private router: Router,  
    ) { }

  signIn({email,password}){
      return this.http.post<TokenResponse>(this.employeeAuth, {email,password}, {observe:'body',responseType:'json'});
  }

  getJwt():string{
    return localStorage.getItem('jwt');
  }

  setJwt(token:string):void{
    localStorage.setItem('jwt',token);
  }

  getLoggedInUser():User{
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  setLoggedInUser(user:User):void{
      localStorage.setItem('currentUser',JSON.stringify(user));
  }

  signOut():void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
    this.router.navigate(["/sign-in"],{replaceUrl:true});
  }

}
