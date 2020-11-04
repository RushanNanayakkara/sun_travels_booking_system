import { Injectable } from '@angular/core';
import { Contract } from '../../shared/models/data-object/Contract';
import { Hotel } from '../../shared/models/data-object/Hotel';
import { RoomType } from '../../shared/models/data-object/RoomType';
import { SearchResponse } from '../../shared/models/responses/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setHotel(hotelInput:Hotel):void{
    const key = "hotel_"+hotelInput.hotelId;
    localStorage.setItem(key,JSON.stringify(hotelInput));
  }

  getHotel(hotel_id:Number):Hotel{
    const key = "hotel_"+hotel_id;
    return JSON.parse(localStorage.getItem(key)) as Hotel;
  }

  setRoomType(roomType:RoomType):void{
    const key = "room_type_"+roomType.roomTypeId;
    localStorage.setItem(key, JSON.stringify(roomType));
  }

  getRoomType(room_type_id:Number):RoomType{
    const key = "room_type_"+room_type_id;
    return JSON.parse(localStorage.getItem(key)) as RoomType;
  }

  setContract(contract:Contract):void{
    const key = "contract_"+contract.contractId;
    localStorage.setItem(key,JSON.stringify(contract));
  }

  getContract(contract_id:Number):Contract{
    const key = "contract_"+contract_id;
    return JSON.parse(localStorage.getItem(key)) as Contract;
  }

  setSearchSubContracatData(searchResponse:SearchResponse):void{
    const key = "search_response_"+searchResponse.subContract.subContractId;
    localStorage.setItem(key,JSON.stringify({hotel:searchResponse.hotel,roomType:searchResponse.roomType}));
  }

  getSearchSubContractData(subcontract_id:Number):any{
    const key = "search_response_"+subcontract_id;
    return JSON.parse(localStorage.getItem(key));
  }

}
