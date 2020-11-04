import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/data-object/Customer';
import { User } from 'src/app/shared/models/data-object/User';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { UserService } from 'src/app/core/user/user.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit,OnDestroy {

  subscriptions:Subscription[]=[];
  loggedInUser:User = null;
  activeCustomer:Customer = null;
  telNumber:String = null;

  constructor(
    private authService: AuthenticationService,
    private customerService: CustomerService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    let defaultCustomer:Customer = {
      customerId: null,
      name: "No customer selected",
      email: "",
      contactNumber:""
    };
    defaultCustomer.name = "No Customer Selected";
    this.activeCustomer = defaultCustomer;
  }
  
  ngOnDestroy(){
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  onSearchTextUpdate(tel:string):void{
    this.subscriptions.push(
      this.customerService.getCustomer(tel).subscribe(
        (customer:Customer)=>{
          this.activeCustomer = customer;
          if(customer===null){
            this._snackBar.open("Customer not found!","close",{
              duration:4000,
              panelClass:['error-snackbar'],
              verticalPosition: 'bottom',
              horizontalPosition:'end'
            })
          }else{
            this.customerService.setActiveCustomer(customer);
          }
        }
      )
    );
  }

  signOut(){
    this.authService.signOut();
  }

  get UserType(){
    return this.authService.getLoggedInUser().tenantId;
  }

}