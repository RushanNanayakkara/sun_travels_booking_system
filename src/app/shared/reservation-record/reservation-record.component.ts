import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/localstorage/local-storage.service';
import { Hotel } from '../models/data-object/Hotel';
import { RoomType } from '../models/data-object/RoomType';

@Component({
  selector: 'sun-travel-reservation-record',
  templateUrl: './reservation-record.component.html',
  styleUrls: ['./reservation-record.component.scss']
})
export class ReservationRecordComponent implements OnInit {

  @Input() index:Number;
  @Input() reservation:FormControl;
  @Output() remove = new EventEmitter<Number>();

  hotelName:string;
  roomTypeName:string;

  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    const reservationDetail:{hotel:Hotel,roomType:RoomType} = this.localStorageService.getSearchSubContractData(this.reservation.value.subContractId);
    this.hotelName = reservationDetail?.hotel?.name;
    this.roomTypeName = reservationDetail?.roomType?.name;
  }

  onRemoveClicked(){
    this.remove.emit(this.index);
  }

}
