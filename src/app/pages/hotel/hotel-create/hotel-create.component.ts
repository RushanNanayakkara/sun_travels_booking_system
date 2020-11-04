import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'protractor';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { HotelService } from 'src/app/core/hotel/hotel.service';
import { RoomType } from 'src/app/shared/models/data-object/RoomType';
import { HotelDetailResponse } from 'src/app/shared/models/responses/HotelDetailResponse';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.scss']
})
export class HotelCreateComponent implements OnInit,OnDestroy {

  hotelDetailForm:FormGroup;
  addRoomForm:FormGroup;
  subscriptions:Subscription[] = [];
  existingRoomList: {[key:number]:RoomType}= {};

  constructor(
    private _location: Location,
    private hotelService:HotelService,
    private authService: AuthenticationService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetForms();
  }

  ngOnDestroy():void{
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  goBack(){
    this._location.back();
  }

  // SERVICE CALLS
  addHotel(){
    if(this.hotelDetailForm.invalid){
      this._snackBar.open("Invalid form data!","close",{
        duration:4000,
        panelClass:['error-snackbar'],
        verticalPosition: 'bottom',
        horizontalPosition:'end'
      });
      return;
    }
    this.subscriptions.push(
      this.hotelService.addHotel(this.hotelDetailForm.value).subscribe(
        (response:HotelDetailResponse) =>{
          this._snackBar.open("Hotel added successfully!","close",{
              duration:4000,
              panelClass:['success-snackbar'],
              verticalPosition: 'bottom',
              horizontalPosition:'end'
            }
          );
          this.resetForms();
        },
        (error:HttpErrorResponse) => {
          this._snackBar.open("Operation failed!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    )
  }

  addExistingRoom(){
    this.subscriptions.push(
      this.hotelService.getRoomType(this.addRoomForm.value.id).subscribe(
        (roomType:RoomType)=>{
          const exisitingRoomIdList = this.hotelDetailForm.controls.existingRoomTypeIdList as FormArray;
          exisitingRoomIdList.push(
            new FormControl(roomType.roomTypeId,Validators.pattern("^[1-9]+[0-9]*$"))
          )
          this.existingRoomList[Number(roomType.roomTypeId)] = roomType;
        },
        (error:HttpErrorResponse) => {
          console.log(error);
          this._snackBar.open("Error, Room not found!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    )
  }

  removeExistingRoom(index:number,roomId:number){
    const exisitingRoomIdList = this.hotelDetailForm.controls.existingRoomTypeIdList as FormArray;
    exisitingRoomIdList.removeAt(index);
    delete this.existingRoomList[roomId];
  }

  addNewRoom(){
    console.log(this.addRoomForm.value);
    const exisitingRoomIdList = this.hotelDetailForm.controls.newRoomTypes as FormArray;
    exisitingRoomIdList.push(
      this.hotelService.getHotelRoomForm(this.addRoomForm.value)
    )
    console.log(this.hotelDetailForm.value)
  }

  removeNewRoom(index:number){
    const newRoomTypes = this.hotelDetailForm.controls.newRoomTypes as FormArray;
    newRoomTypes.removeAt(index);
  }

  resetForms(){
    this.hotelDetailForm = this.hotelService.getHotelDetailForm();
    this.addRoomForm = new FormGroup(
      {
        id: new FormControl(null,Validators.nullValidator),
        name: new FormControl(null,Validators.minLength(5)),
        description: new FormControl(null,[Validators.maxLength(500)])
      }
    )
    this.existingRoomList = [];
  }

  // getters
  get existingRoomIdList(){
    return this.hotelDetailForm.controls.existingRoomTypeIdList.value;
  }

  get newRoomTypes(){
    return this.hotelDetailForm.value.newRoomTypes;
  }

}
