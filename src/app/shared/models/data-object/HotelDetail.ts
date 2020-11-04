import { Hotel } from './Hotel';
import { RoomType } from './RoomType';

export interface HotelDetail{
    hotel:Hotel;
    existingRoomTypeIdList:number[];
    newRoomTypes: RoomType;
}