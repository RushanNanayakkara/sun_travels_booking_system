import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/data-object/Customer';
import { User } from 'src/app/shared/models/data-object/User';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { UserService } from 'src/app/core/user/user.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {

  loggedInUser:User = null;
  activeCustomer:Customer = null;
  telNumber:String = null;

  constructor(
    private authService: AuthenticationService,
    private customerService: CustomerService
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

  getCustomer(tel:String):void{
    this.customerService.getCustomer(tel).subscribe(customer=>this.activeCustomer = customer);
  }

  onSearchTextUpdate(event:String){
    this.customerService.getCustomer(event).subscribe(customer=>this.activeCustomer=customer);
  }

  signOut(){
    this.authService.signOut();
  }


}