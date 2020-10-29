export interface SearchRequest{
        destination:string;
        checkInDate:Date,
        checkOutDate:Date,
        numberOfRooms: Number,
        numberOfAdults: Number,
        keyLocationList:String[],
        hotelNameList: String[],
        maxPrice:Number,
        minPrice: Number
}