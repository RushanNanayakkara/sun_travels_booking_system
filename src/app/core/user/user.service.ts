import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/constants/url';
import { ActivityRecord } from 'src/app/shared/models/data-object/ActiviryRecord';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from 'src/app/shared/models/data-object/User';
import { PasswordChangeRequest } from 'src/app/shared/models/requests/passwordChangeRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _getActivityUrl = "/api/v1/activity/user";
  _updateAccountUrl = "/api/v1/user/update";
  _passwordChangeUrl = "/api/v1/user/update/password";

  constructor(
    private authService:AuthenticationService, 
    private http:HttpClient,
    private fb: FormBuilder) { }
  
  getAccountForm():FormGroup{
    const activeUser:User = this.authService.getLoggedInUser();
    const accountForm = new FormGroup(
      {
        userId: new FormControl(activeUser.userId,Validators.required),
        employeeId: new FormControl(activeUser.employeeId,Validators.required),
        firstName: new FormControl(activeUser.firstName, Validators.pattern('[a-zA-Z ]*')),
        lastName: new FormControl(activeUser.lastName, Validators.pattern('[a-zA-Z ]*')),
        email: new FormControl(activeUser.email, [Validators.email, Validators.required]),
        password: new FormControl(null,[Validators.min(6),Validators.max(20)]),
        newPassword: new FormControl(null,[Validators.min(6),Validators.max(20)]),
        repeatPassword: new FormControl(null,[Validators.min(6),Validators.max(20)]),
        tenantId: new FormControl(activeUser.tenantId,Validators.nullValidator ),
        status: new FormControl(activeUser.status, Validators.nullValidator)
      }
    );
    return accountForm;
  }

  // API REQUESTS
  getActivity(offset:number, count:number){
    const options = { params: new HttpParams()
                                    .set('offset', String(offset))
                                    .set('count',String(count))};
    return this.http.get<ActivityRecord[]>(BASE_URL+this._getActivityUrl, options);
  }

  updateAccount(user:User){
    return this.http.patch<User>(BASE_URL+this._updateAccountUrl, user,{observe:'body',responseType:'json'});
  }

  changePassword(passwordChangeRequest:PasswordChangeRequest){
    return this.http.patch<User>(BASE_URL+this._passwordChangeUrl, passwordChangeRequest,{observe:'body',responseType:'json'});
  }

}
