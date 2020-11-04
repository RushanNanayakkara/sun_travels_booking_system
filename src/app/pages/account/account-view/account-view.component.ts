import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/core/user/user.service';
import { User } from 'src/app/shared/models/data-object/User';
import { PasswordChangeRequest } from 'src/app/shared/models/requests/passwordChangeRequest';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  accountForm:FormGroup;
  subscriptions:Subscription[] = [];

  constructor(
    private _location: Location,
    private userService: UserService,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.accountForm = this.userService.getAccountForm();
  }

  goBack(){
    this._location.back();
  }

  toggleStatus(){
    console.log("toggle status need implementation");
  }

  // SERVICE CALLS
  updateAccount(){
    if(this.accountForm.invalid){
      this._snackBar.open("Invalid form data!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      });
    }
    this.subscriptions.push(
      this.userService.updateAccount(this.accountForm.value as User).subscribe(
        (user:User)=>{
          this.authService.setLoggedInUser(user);
          this._snackBar.open("Update successfull!","close",{
            duration:4000,
            panelClass:['success-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          this._snackBar.open("Error updating account!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    )
  }

  updatePassword(){
    
    this.subscriptions.push(
      this.userService.changePassword(this.accountForm.value as PasswordChangeRequest).subscribe(
        (user:User)=>{
          this._snackBar.open("Update successfull!","close",{
            duration:4000,
            panelClass:['success-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
          this._snackBar.open(error.message,"close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    )
  }

  // GETTERS
  get userType(){
    return this.accountForm.value.tenantId;
  }

}
