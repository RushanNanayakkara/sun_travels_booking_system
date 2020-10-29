import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/app/constants/url';
import { SearchRequest } from 'src/app/shared/models/requests/searchRequest';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  searchUrl:string = "/api/v1/search/room/available"
  
  constructor(private http: HttpClient) { }

  searchWithoutFilter(req:Partial<SearchRequest>){
    req.keyLocationList = [];
    req.hotelNameList = [];
    req.maxPrice = null;
    req.minPrice = null;
    
    return this.http.post<SearchResponse[]>(BASE_URL + this.searchUrl,req,{observe:'body',responseType:'json'})
  }

  searchWithFilter(req:Partial<SearchRequest>){
    
    return this.http.post<SearchResponse[]>( BASE_URL + this.searchUrl,req,{observe:'body',responseType:'json'})
  }
  
}
