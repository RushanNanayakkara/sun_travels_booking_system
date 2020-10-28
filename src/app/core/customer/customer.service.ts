import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from "../../shared/models/data-object/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customer:Customer = {
    customerId  : -1,
    name  : "New Customer",
    email : "",
    contactNumber : ""
  }

  constructor() { }


  //todo: complete function
  getCustomer(tel: String): Observable<Customer>{
    if(this.customer.contactNumber===tel)
      return of(this.customer);
    else
      return of(this.customer);
  }

}
