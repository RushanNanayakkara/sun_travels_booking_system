import { Location } from '@angular/common';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { CustomerService } from 'src/app/core/customer/customer.service';
import { LocalStorageService } from 'src/app/core/localstorage/local-storage.service';
import { ReservationService } from 'src/app/core/reservation/reservation.service';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss']
})
export class ReservationCreateComponent implements OnInit,OnDestroy {

  reservationForm:FormGroup;
  hasError: Boolean = true; 
  subscriptions:Subscription[] = [];

  constructor(
    private authService:AuthenticationService,
    private  reservationService: ReservationService,
    private _snackBar: MatSnackBar,
    private localStorageService:LocalStorageService,
    private _location:Location,
    private router:Router,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    const recievedRecord = history.state?.record as SearchResponse;
    if(recievedRecord){ 
      this.localStorageService.setSearchSubContracatData(recievedRecord);
      this.reservationForm = this.reservationService.buildGroupReservationForm(recievedRecord);
    }else{
      this.reservationForm = this.reservationService.getCurrentReservationForm();
    }
    const activeCustomer = this.customerService.getActiveCustomer();
    if(activeCustomer){
      this.reservationForm.patchValue(
        {
          customerId:activeCustomer.customerId,
          customerName:activeCustomer.name,
          customerTelNumber:activeCustomer.contactNumber,
          customerEmail:activeCustomer.email
        }
      )
    }
    this.reservationForm.patchValue(
      {
        createdEmployeeId: this.authService.getLoggedInUser().userId
      }
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  // RESERVATION FORM FUNCTIONS
  removeReservationFromForm(index:Number){
    this.reservationService.removeReservationFromForm(this.reservationForm,index);
  }

  placeReservations(){
    if(
      this.reservationForm.invalid
      ){
      this._snackBar.open("Invalied form data!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      })
      return;
    } else if(
      this.reservationForms.length==0
      ){
      this._snackBar.open("No reservations to add!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      });
      return;
    }

    this.subscriptions.push(
      this.reservationService.placeReservationList(this.reservationForm.value).subscribe(
        newReservationList=>{
          console.log(newReservationList);
          this.router.navigate(['/reservation/summary'],{state:{reservationList:newReservationList}});
          this._snackBar.open("Reservation made successfully!","close",{
            duration:4000,
            panelClass:['success-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
       },
       error=>{
         console.log("Error creating reservation.",error);
         this._snackBar.open(error.error.message,"close",{
          duration:4000,
          panelClass:['error-snackbar'],
          verticalPosition: 'bottom',
          horizontalPosition:'end'
        });
       }
      )
    );

  }
  
  removeReservation(index:Number){
    this.reservationForms.removeAt(Number(index));
  } 

  cancel(){
    console.log("cancelled");
  }

  // NAVIGATION
  goBack(){
    this._location.back();
  }

  // GETTERS
  get reservationForms():FormArray{
    return this.reservationForm.get('reservations') as FormArray;
  }

}
