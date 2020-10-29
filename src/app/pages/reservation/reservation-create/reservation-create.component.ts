import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ReservationService } from 'src/app/core/reservation/reservation.service';

@Component({
  selector: 'app-reservation-create',
  templateUrl: './reservation-create.component.html',
  styleUrls: ['./reservation-create.component.scss']
})
export class ReservationCreateComponent implements OnInit {

  reservationForm:FormGroup;
  hasError: Boolean = true;

  constructor(
    private authService:AuthenticationService,
    private  reservationService: ReservationService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    const recievedRecord = history.state.record;
    this.reservationForm = this.reservationService.buildReservationForm(recievedRecord);    
    this.reservationForm.patchValue(
      {
        reservation:{
          createdEmployeeId: this.authService.getLoggedInUser().employeeId
        }
      }
    );
  }

  validateEmail(email:string){
    return email===null || email==="" || email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

  validateCheckInDate(date:Date){
    return date<=new Date();
  }

  validateCheckOutDate(date:Date){
    return this.reservationForm.value.reservation.checkInDate < date;
  }
  
  createReservation(){
    if(this.reservationForm.invalid){
      this._snackBar.open("Invalied form data!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      });
      return;
    }
    this.reservationService.addreservation(this.reservationForm.value).subscribe(newReservation=>{
      console.log(newReservation);
    });
  }

  cancel(){
    console.log("cancelled");
  }

  // getFormValidationErrors() {
  //   Object.keys(this.reservationForm.controls).forEach(key => {
  
  //   const controlErrors: ValidationErrors = this.reservationForm.get(key).errors;
  //   if (controlErrors != null) {
  //         Object.keys(controlErrors).forEach(keyError => {
  //           console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
  //         });
  //       }
  //     });
  //   }
}
