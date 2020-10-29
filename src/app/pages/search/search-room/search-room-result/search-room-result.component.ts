import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/search/search.service';
import { SearchResponse } from 'src/app/shared/models/responses/SearchResponse';

@Component({
  selector: 'app-search-room-result',
  templateUrl: './search-room-result.component.html',
  styleUrls: ['./search-room-result.component.scss']
})
export class SearchRoomResultComponent implements OnInit {

  searchForm:FormGroup;
  filterPanelOpenState:Boolean = false;
  filterOptions:String[] = [];
  subscriptions:Subscription[]=[];

  keyLocationFilterInput:string;
  hotelNameInput:string;
  minPrice:Number;
  maxPrice:Number;

  searchResults: SearchResponse[] = [];

  constructor(
    private searchService:SearchService,
    private router:Router,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.searchResults = history.state.response;
    this.searchForm = new FormGroup(
      {
        destination: new FormControl("",Validators.required),
        checkInDate: new FormControl(null, Validators.required),
        checkOutDate: new FormControl(null, Validators.required),
        numberOfAdults: new FormControl(null, Validators.required),
        numberOfRooms: new FormControl(null, Validators.required),
        keyLocationList: new FormControl([]),
        hotelNameList: new FormControl([]),
        maxPrice: new FormControl(null,Validators.pattern("^[0-9]*$")),
        minPrice: new FormControl(null,Validators.pattern("^[0-9]*$"))
      }
    )
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  search(){
    this.refreshFilterOptions();
    console.log(this.searchForm.value);
    if(this.searchForm.invalid){
        this._snackBar.open("Invalied form data!","close",{
          duration:4000,
          panelClass:['error-snackbar'],
          verticalPosition: 'bottom',
          horizontalPosition:'end'
        });
        return;
      }
      this.subscriptions.push(
        this.searchService.searchWithoutFilter(this.searchForm.value)
        .subscribe(response=>{
          this.searchResults =response;
        })
      );
  }

  addFilters(){
    let klv = this.keyLocationFilterInput;
    if(
        klv!=null
        && 
        klv.trim()!=""
        &&
        this.searchForm.value.keyLocationList.indexOf(klv)===-1
      ){
      this.searchForm.value.keyLocationList.push(klv);
    }

    let hni = this.hotelNameInput;
    if(
        hni!=null
        && 
        hni.trim()!=""
        &&
        this.searchForm.value.hotelNameList.indexOf(hni)===-1
      ){
      this.searchForm.value.hotelNameList.push(hni);
    }


    this.refreshFilterOptions();
    console.log(this.searchForm.value.keyLocationList)
  }

  refreshFilterOptions(){
    this.filterOptions = [];
    this.searchForm.value.keyLocationList.forEach(element => {
      this.filterOptions.push(element);
    });
    this.searchForm.value.hotelNameList.forEach(element => {
      this.filterOptions.push(element);
    });
  }

}
