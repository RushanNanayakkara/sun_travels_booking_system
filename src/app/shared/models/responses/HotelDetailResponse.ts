import { Hotel } from '../data-object/Hotel';
import { RoomType } from '../data-object/RoomType';

export interface HotelDetailResponse{
    hotel:Hotel,
    roomTypes:RoomType[],
    contractId:Number
}