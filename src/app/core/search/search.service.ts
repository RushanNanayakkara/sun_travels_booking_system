import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchRequest } from 'src/app/shared/models/requests/searchRequest';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  

  constructor(private http: HttpClient) { }

  searchWithoutFilter(req:Partial<SearchRequest>){
    req.keyLocationList = [];
    req.hotelNameList = [];
    req.maxPrice = null;
    req.minPrice = null;

    let apiUrl: string = "https://run.mocky.io/v3/5a57208d-71f0-40ff-99e7-e9a7d44d7729";
    
    return this.http.post<SearchResponse[]>(apiUrl,req,{observe:'body',responseType:'json'})
  }

  searchWithFilter(req:Partial<SearchRequest>){

    let apiUrl: string = "https://run.mocky.io/v3/5a57208d-71f0-40ff-99e7-e9a7d44d7729";
    
    return this.http.post<SearchResponse[]>(apiUrl,req,{observe:'body',responseType:'json'})
  }
  
}
