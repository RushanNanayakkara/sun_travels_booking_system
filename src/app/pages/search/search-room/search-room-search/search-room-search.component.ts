import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/search/search.service';

@Component({
  selector: 'app-search-room-search',
  templateUrl: './search-room-search.component.html',
  styleUrls: ['./search-room-search.component.scss']
})
export class SearchRoomSearchComponent implements OnInit,OnDestroy {

  subscriptions:Subscription[]=[];
  searchForm: FormGroup;

  constructor(
    private searchService:SearchService,
    private router:Router,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup(
      {
        destination: new FormControl(null,Validators.required),
        checkInDate: new FormControl(null, [Validators.required,]),
        checkOutDate: new FormControl(null, Validators.required),
        numberOfAdults: new FormControl(null, [Validators.required,Validators.min(1)]),
        numberOfRooms: new FormControl(null, [Validators.required,Validators.min(1)])
      },{validators:Validators.compose([this.CheckInOutDate])}
    )
  }

  
  CheckInOutDate(AC: AbstractControl){
    let dateFrom = new Date(AC.get('checkInDate').value) ;
    let dateTo = new Date(AC.get('checkOutDate').value);

     if(dateTo?.getTime() > dateFrom?.getTime())
     {
         return null;
     }

     AC.get('checkOutDate').setErrors({BeforeCheckIn:true});
     
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  search(){
    if(this.searchForm.invalid){
      this._snackBar.open("Invalied Search!","close",{
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
        console.log(response)
        this.router.navigate(['/search/room/filter'],{state:{response:response,searchQuery:this.searchForm.value}});
      })
    );
  }

}
