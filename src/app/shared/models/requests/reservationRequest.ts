import { reservation } from '../data-object/Reservation';

export interface ReservationRequst{
    reservation: Partial<reservation>;
    customerId: Number,
    customerName:string,
    customerTelNumber:string,
    customerEmail:string
}