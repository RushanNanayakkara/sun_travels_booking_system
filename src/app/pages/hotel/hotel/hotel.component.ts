import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeStamp } from 'console';
import { Subscription } from 'rxjs';
import { HotelService } from 'src/app/core/hotel/hotel.service';
import { Hotel } from 'src/app/shared/models/data-object/Hotel';
import { Reservation } from 'src/app/shared/models/data-object/Reservation';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  subscriptions: Subscription[] = [];
  reservationList:Reservation[];
  displayedColumns: string[] = [
    'position','name','country','city','status','action' 
  ];
  dataSource:Hotel[];
  
  constructor(private router:Router,
              private hotelService:HotelService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.hotelService.getHotels(0,Number.MAX_VALUE).subscribe(
        (hotels:Hotel[])=>{
          this.dataSource = hotels;
        },
        (error:HttpErrorResponse) =>{
          console.log(error);
          this._snackBar.open("Error updating account!","close",{
            duration:4000,
            panelClass:['error-snackbar'],
            verticalPosition: 'bottom',
            horizontalPosition:'end'
          });
        }
      )
    )
  }

  goBack(){
    this.router.navigateByUrl('/search/room');
  }

  viewHotel(){
    console.log("view hotel")
  }


}
