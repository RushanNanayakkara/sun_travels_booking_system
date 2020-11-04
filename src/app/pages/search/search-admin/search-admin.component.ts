import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/search/search.service';

@Component({
  selector: 'app-search-admin',
  templateUrl: './search-admin.component.html',
  styleUrls: ['./search-admin.component.scss']
})
export class SearchAdminComponent implements OnInit,OnDestroy {

  subscriptions:Subscription[]=[];
  searchForm: FormGroup;
  types: {key:string,value:any}[];

  constructor(
    private searchService:SearchService,
    private router:Router,
    private _snackBar: MatSnackBar
    ) { }


  ngOnInit(): void {
    this.types = [
      {key:"Hotel",value:0},
      {key:"Contract",value:1},
      {key:"Employee",value:2}
    ];
    this.searchForm = new FormGroup(
      {
        keyword: new FormControl(null,Validators.required),
        searchType: new FormControl(0, [Validators.required,])
      }
    )
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
    if(this.searchForm.value.searchType==0){
      this.router.navigate(['/hotel/view'],{queryParams:{id:this.searchForm.value.keyword}});
    }
  }
}
