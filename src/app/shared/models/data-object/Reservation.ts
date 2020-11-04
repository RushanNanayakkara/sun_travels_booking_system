import { Time } from '@angular/common';

export interface Reservation{
    reservationId:Number;
    uuid:String;
    customerId:Number;
    subContractId:Number;
    noOfRooms:Number;
    checkInDate:Date;
    checkOutDate:Date;
    status:string;
    noOfAdults:Number;
    markedUpPrice:Number;
    createdEmployeeId:Number;
    createdAt:Time;
    lastUpdatedAt:Time;
}