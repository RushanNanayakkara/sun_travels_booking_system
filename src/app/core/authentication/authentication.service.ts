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

  authUrl:string = "/api/v1/auth/authenticate";

  constructor(
    private http: HttpClient,
    private router: Router,  
    ) { }

  signIn({email,password}){
      return this.http.post<TokenResponse>(BASE_URL+this.authUrl, {email,password}, {observe:'body',responseType:'json'});
  }

  getToken():string{
    return localStorage.getItem('jwt');
  }

  setToken(token:string):void{
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
  
  async validateToken(token:string){
    return this.http.get(BASE_URL+"/api/v1/auth/validate-token").toPromise();
  }

}
