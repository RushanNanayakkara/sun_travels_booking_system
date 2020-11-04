import { Reservation } from '../data-object/Reservation';

export interface ReservationRequst{
    reservation: Partial<Reservation>;
    customerId: Number,
    customerName:string,
    customerTelNumber:string,
    customerEmail:string
}