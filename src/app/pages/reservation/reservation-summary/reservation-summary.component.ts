import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/shared/models/data-object/Reservation';


@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss']
})
export class ReservationSummaryComponent implements OnInit {

  reservationList:Reservation[];
  displayedColumns: string[] = [
    'uuid', 'sunContractId', 'noOfRooms', 'checkInDate', 'checkOutDate', 
    'noOfAdults', 'markedUpPrice'];
  dataSource:Reservation[];
  
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.dataSource = history.state.reservationList;
  }

  goBack(){
    this.router.navigateByUrl('/search/room');
  }


}
