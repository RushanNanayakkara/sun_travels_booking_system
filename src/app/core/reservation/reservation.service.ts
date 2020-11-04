import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/constants/url';
import { Reservation } from 'src/app/shared/models/data-object/Reservation';
import { ReservationRequst } from 'src/app/shared/models/requests/reservationRequest';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  addUrl:string = "/api/v1/reservation/add";
  currentGroupReservationRequestForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder) {}

  getCurrentReservationForm():FormGroup{
    if(! this.currentGroupReservationRequestForm){
      this.currentGroupReservationRequestForm = this.buildGroupReservationForm();
    }
    return this.currentGroupReservationRequestForm;
  }

  buildSingleReservationForm(reservation?:Reservation):FormGroup{
    const singleReservationForm = new FormGroup(
      {
        reservationId: new FormControl(null,Validators.nullValidator),
        uuid: new FormControl(null,Validators.nullValidator),
        customerId: new FormControl(null,Validators.nullValidator),
        subContractId: new FormControl(null,Validators.nullValidator),
        noOfRooms: new FormControl(null,Validators.nullValidator),
        checkInDate: new FormControl(null,Validators.nullValidator),
        checkOutDate: new FormControl(null,Validators.nullValidator),
        status: new FormControl(null,Validators.nullValidator),
        noOfAdults: new FormControl(null,Validators.nullValidator),
        markedUpPrice: new FormControl(null,Validators.nullValidator),
        createdEmployeeId: new FormControl(null,Validators.nullValidator),
        createdAt: new FormControl(null,Validators.nullValidator),
        lastUpdatedAt: new FormControl(null,Validators.nullValidator)
      }
    );
    if(reservation) singleReservationForm.setValue(reservation);
    return singleReservationForm;
  }

  buildGroupReservationForm(record?:SearchResponse):FormGroup{
    
    if(!this.currentGroupReservationRequestForm){
      this.currentGroupReservationRequestForm = new FormGroup(
        {
          reservations: new FormArray([]),
          customerId: new FormControl(null, [Validators.pattern("^[0-9]+$")]),
          customerName: new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]+$")]),
          customerTelNumber: new FormControl(null,[Validators.required,Validators.pattern("^[^a-zA-Z]+$")]),
          customerEmail: new FormControl(null,[Validators.required,Validators.email]),
          createdEmployeeId: new FormControl(null, Validators.required)
        }
      )
    }

    if(record) this.populateFormWithRecord(record,this.currentGroupReservationRequestForm);

    // this.getReservationCountForSubContract(record.subContract.subContractId);
    return this.currentGroupReservationRequestForm;
  }

  private populateFormWithRecord(record:SearchResponse,reservationRequestForm:FormGroup){
    const reservationArray = reservationRequestForm.controls.reservations as FormArray;
    const requiredNumberValidator = [Validators.required,Validators.pattern("^[0-9]*$")];
    
    reservationArray.push(this.fb.group({
      subContractId: this.fb.control(record.subContract.subContractId,[...requiredNumberValidator]),
      noOfRooms: this.fb.control(
        record.requestedRoomCount,
        [...requiredNumberValidator,
          Validators.max(Number(record.subContract.maxAvailable)),
          Validators.min(1)
        ]),
      checkInDate: record.checkInDate,
      checkOutDate:record.checkOutDate,
      noOfAdults: this.fb.control(
        record.requestedAdultsCount,
        [...requiredNumberValidator,
          Validators.max(Number(record.subContract.maxAdultsAllowed)),
          Validators.min(1)
        ]),
      markedUpPrice: record.totalCost
    }));

  }
  
  removeReservationFromForm(reservationRequestForm:FormGroup,index:Number){
    reservationRequestForm.value.reservations.removeAt(index);
  }

  getReservationCountForSubContract(subContractId:Number){
    const controls = this.currentGroupReservationRequestForm.value;
    for(let control of controls.reservations){
      console.log(control)
    }
  }

  // API CALLS

  placeReservationList(reservation:ReservationRequst){
    this.currentGroupReservationRequestForm = null;
    return this.http.post<SearchResponse[]>(BASE_URL+"/api/v1/reservation/add/list",reservation,{observe:'body',responseType:'json'})
  }

  getReservationByUuid(uuid:string){
    const options = { params: new HttpParams().set('uuid', uuid) };
    return this.http.get<Reservation>(BASE_URL+"/api/v1/reservation/get/uuid",options);
  }

  cancelReservation(id:Number){
    const options = { 
      params: new HttpParams().set('reservationId', String(id)) ,
      responseType:'text' as 'text'
    };
    return this.http.delete(BASE_URL+"/api/v1/reservation/cancel",options);
  }


}
