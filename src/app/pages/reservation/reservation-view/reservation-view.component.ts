import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { ReservationService } from 'src/app/core/reservation/reservation.service';
import { Reservation } from 'src/app/shared/models/data-object/Reservation';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/modal/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservation-view',
  templateUrl: './reservation-view.component.html',
  styleUrls: ['./reservation-view.component.scss']
})
export class ReservationViewComponent implements OnInit,OnDestroy {

  reservationForm:FormGroup;
  subscriptions:Subscription[] = [];

  constructor(
    private activatedRoute:ActivatedRoute,
    private reservationService:ReservationService,
    private _snackBar:MatSnackBar,
    private _location:Location,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    const uuid:string = this.activatedRoute.snapshot.paramMap.get("uuid");
    if(uuid) {
      this.reservationService.getReservationByUuid(uuid).subscribe(
        (reservation:Reservation)=>{
          this.reservationForm = this.reservationService.buildSingleReservationForm(reservation);
        },
        (err:HttpErrorResponse) => {
          this._snackBar.open("Reservation not fount! Invalid UUID!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      );
    }else{
      this.reservationForm = this.reservationService.buildSingleReservationForm();
    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  searchUUID(uuid:string){
    this.subscriptions.push(
      this.reservationService.getReservationByUuid(uuid).subscribe(
        (reservation:Reservation)=>{
          console.log(reservation)
          console.log("reached")
          this.reservationForm = this.reservationService.buildSingleReservationForm(reservation);
        },
        (err:HttpErrorResponse) => {
          this.reservationForm = this.reservationService.buildSingleReservationForm();
          this._snackBar.open("Reservation not fount! Invalid UUID!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    );
  }

  update(){
    throw new Error("Not yet implemented");
  }

  goBack(){
    this._location.back();
  }

  onSearchTextUpdate($event){
    console.log("search clicked")
  }

  confirmAndCancel(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data:{
        action:"cancel",
        trueButtonText:"Confirm",
        falseButtonText:"Cancel",
        warningMessage:"This action is not reversable!"
      }
    });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(confirmed=>{
        if(confirmed){
          this.reservationService.cancelReservation(this.reservationForm.value.reservationId).subscribe(
            (result:String)=>{
              if(result==='SUCCESS'){
                this._snackBar.open("Reservation cancelled!","close",{
                  duration:4000,
                  panelClass:['success-snackbar'],
                  verticalPosition: 'bottom',
                  horizontalPosition:'end'
                })
              }
              else{
                console.log(result);
                this._snackBar.open("Operation failed!","close",{
                  duration:4000,
                  panelClass:['error-snackbar'],
                  verticalPosition: 'bottom',
                  horizontalPosition:'end'
                })
              }
            },
            (response:HttpErrorResponse)=>{
              this._snackBar.open(response.error.message,"close",{
                duration:4000,
                panelClass:['error-snackbar'],
                verticalPosition: 'bottom',
                horizontalPosition:'end'
              })
              console.log(response);
            }
          )
        }
      })
    );
  }

}
