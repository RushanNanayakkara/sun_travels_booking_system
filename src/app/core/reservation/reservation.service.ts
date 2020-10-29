import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/constants/url';
import { ReservationRequst } from 'src/app/shared/models/requests/reservationRequest';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  addUrl:string = "/api/v1/reservation/add";

  constructor(private http: HttpClient) { 
    
  }


  public buildReservationForm(record?:SearchResponse):FormGroup{
    const requiredNumberValidator = [Validators.required,Validators.pattern("^[0-9]*$")];

    let reservationForm:FormGroup;
    let reservationRequestForm: FormGroup;

    reservationForm = new FormGroup(
      {
        subContractId: new FormControl(null,requiredNumberValidator),
        noOfRooms: new FormControl(null,requiredNumberValidator),
        checkInDate: new FormControl(null, Validators.required),
        checkOutDate: new FormControl(null,Validators.required ),
        noOfAdults: new FormControl(null, requiredNumberValidator),
        markedUpPrice: new FormControl(null,requiredNumberValidator),
        createdEmployeeId: new FormControl(null, Validators.required)
      }
    );
    
    reservationRequestForm = new FormGroup(
      {
        reservation: reservationForm,
        customerId: new FormControl(null, Validators.pattern("^[0-9]*$")),
        customerName: new FormControl(null,Validators.nullValidator),
        customerTelNumber: new FormControl(null,Validators.pattern("^/^[^a-zA-Z]+$/$")),
        customerEmail: new FormControl(null,Validators.email)
      }
    )

    if(record) this.populateFormWithRecord(record,reservationRequestForm);

    return reservationRequestForm;
  }
  
  populateFormWithRecord(record:SearchResponse,reservationRequestForm:FormGroup){
    reservationRequestForm.patchValue(
      {
        reservation:{
          subContractId: record.subContract.contractId,
          noOfRooms: record.requestedRoomCount,
          checkInDate: record.checkInDate,
          checkOutDate:record.checkOutDate,
          noOfAdults: record.requestedAdultsCount,
          markedUpPrice: record.totalCost
        }
      }
    )
  }

  addreservation(reservation:ReservationRequst){
    return this.http.post<SearchResponse[]>("https://run.mocky.io/v3/78c13eec-547e-4d8c-806b-eaf24b1f41ca",reservation,{observe:'body',responseType:'json'})
  }
}
