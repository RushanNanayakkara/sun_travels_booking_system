import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/data-object/Customer';
import { User } from 'src/app/model/data-object/User';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { UserService } from 'src/app/service/user/user.service';

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
    private userService: UserService,
    private customerService: CustomerService
    ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUser().subscribe(user=>this.loggedInUser = user);
    let defaultCustomer = new Customer();
    defaultCustomer.name = "No Customer Selected";
    this.activeCustomer = defaultCustomer;
  }

  getCustomer(tel:String):void{
    this.customerService.getCustomer(tel).subscribe(customer=>this.activeCustomer = customer);
  }

  onSearchTextUpdate(event:String){
    this.customerService.getCustomer(event).subscribe(customer=>this.activeCustomer=customer);
  }

}
