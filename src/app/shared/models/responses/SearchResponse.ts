export interface SearchResponse{
        hotel: {
            hotelId: Number;
            name: string;
            email: string;
            streetAddress: string;
            addressLine2: string;
            city: string;
            stateOrProvinceOrRegion: string;
            postalCode: Number;
            country: string;
            status: true;
        },
        roomType: Number;
        subContract: {
            subContractId: Number;
            contractId: Number;
            roomTypeId: Number;
            perPersonPerNightPrice: Number;
            maxAvailable: Number;
            maxAdultsAllowed: Number;
            status: string;
        };        
        totalCost: Number;
        availableCount: Number;
}