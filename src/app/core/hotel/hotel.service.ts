import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { off } from 'process';
import { BASE_URL } from 'src/app/constants/url';
import { Hotel } from 'src/app/shared/models/data-object/Hotel';
import { HotelDetail } from 'src/app/shared/models/data-object/HotelDetail';
import { RoomType } from 'src/app/shared/models/data-object/RoomType';
import { HotelDetailResponse } from 'src/app/shared/models/responses/HotelDetailResponse';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  _getAllHotelUrl = '/api/v1/hotel/get/all';
  _getRoomTypeUrl = '/api/v1/hotel/get/room';
  _addHotelDetailUrl = '/api/v1/hotel/add';
  _getHotelDetailUrl = '/api/v1/hotel/get/detail';
  _updateHotelDetailUrl = '/api/v1/hotel/update/detail';

  constructor(private http:HttpClient) { }


  // FORM FUNCTIONS
  getHotelDetailForm(hotelDetail?:HotelDetail){
    const hotelDetailForm:FormGroup = new FormGroup(
      {
        hotel: this.getHotelForm(),
        existingRoomTypeIdList: new FormArray([]),
        newRoomTypes: new FormArray([]),
      }
    );
    return hotelDetailForm;
  }

  getHotelForm(hotel?:Hotel):FormGroup{
    const hotelForm:FormGroup = new FormGroup(
      {
        hotelId: new FormControl(null,Validators.pattern("[1-9]+[0-9]*")),
        name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        streetAddress: new FormControl(null, Validators.required),
        addressLine2: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        stateOrProvinceOrRegion: new FormControl(null, Validators.required),
        postalCode: new FormControl(null, [Validators.required,Validators.pattern("[1-9]+[0-9]*")]),
        country: new FormControl(null, Validators.required),
        status: new FormControl(true,Validators.required)
      }
    );
    if(hotel) hotelForm.patchValue(hotel);
    return hotelForm;
  }

  getHotelRoomForm(roomType:RoomType){
    const roomTypeForm = new FormGroup(
      {
        roomTypeId: new FormControl(null,Validators.pattern("[1-9]+[0-9]*")),
        name: new FormControl(null,[Validators.required,Validators.minLength(1)]),
        description: new FormControl(null,[Validators.required, Validators.minLength(10)])
      }
    );
    if(roomType)
      roomTypeForm.patchValue(roomType);
    return roomTypeForm;
  }

  
  // API requests
  getHotelDetail(id:number){
    return this.http.get<HotelDetailResponse>(BASE_URL+this._getHotelDetailUrl+'?'+'id='+id);
  }

  getHotels(offset:number,count:number){
    return this.http.get<Hotel[]>(BASE_URL+this._getAllHotelUrl, {params:{offset:'0',count:'1000'}});
  }

  getRoomType(id:Number){
    return this.http.get<RoomType>(BASE_URL+this._getRoomTypeUrl+'?'+'roomTypeId='+id);
  }

  addHotel(hotelDetail:HotelDetail){
    return this.http.post<any>(BASE_URL+this._addHotelDetailUrl,hotelDetail,{observe:'body',responseType:'json'});
  }

  updateHotel(hotelDetail:HotelDetail){
    return this.http.patch<any>(BASE_URL+this._updateHotelDetailUrl,hotelDetail,{observe:'body',responseType:'json'});
  }

}
