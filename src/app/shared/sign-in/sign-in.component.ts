import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TokenResponse } from '../models/responses/TokenResponse';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm:FormGroup;
  hide = true;
  isWrongCredentials : true;
  isBusy = false;

  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,  
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isBusy = true;
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null,[Validators.required,Validators.email]),
        password:  new FormControl(null, [Validators.required,Validators.minLength(6)])
      }
    )
    this.isBusy = false;
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onLogin():void{
    if(this.loginForm.invalid){
      this._snackBar.open("Invalied form data!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      });
      return;
    }
    this.isBusy = true;
    this.subscriptions.push(
      this.authService.signIn(this.loginForm.value).subscribe((response:TokenResponse)=>{
        this.authService.setJwt(String(response.token));
        this.authService.setLoggedInUser(response.user);
        if(response.user.tenantId==1) this.router.navigateByUrl('/search/admin');
        else this.router.navigateByUrl('/search/room');
        this._snackBar.open(`Welcome back ${response.user.firstName}!`,"close",{
          duration:4000,
          panelClass:['success-snackbar'],
          verticalPosition: 'bottom',
          horizontalPosition:'end'
        });
      },
      (err : HttpErrorResponse)=>{
        this.isWrongCredentials = true;
        this._snackBar.open(err.error.message,"close",{
          duration:4000,
          panelClass:['error-snackbar'],
          verticalPosition: 'bottom',
          horizontalPosition:'end'
        });
      })
    )
  }
}
