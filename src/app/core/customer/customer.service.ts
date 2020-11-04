import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BASE_URL } from 'src/app/constants/url';
import { Customer } from "../../shared/models/data-object/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  getCustomerUrl:string = "/api/v1/customer/get-by-contact"
  activeCustomer:Customer;

  constructor(private http:HttpClient) { }

  getCustomer(tel: string){
    const options = { params: new HttpParams().set('tel', tel) };
    return this.http.get<Customer>(BASE_URL+this.getCustomerUrl, options);
  }

  getActiveCustomer(){
    return this.activeCustomer;
  }

  setActiveCustomer(customer:Customer){
    this.activeCustomer = customer;
  }

}
