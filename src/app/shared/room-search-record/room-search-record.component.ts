import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from '../models/responses/SearchResponse';

@Component({
  selector: 'app-room-search-record',
  templateUrl: './room-search-record.component.html',
  styleUrls: ['./room-search-record.component.scss']
})
export class RoomSearchRecordComponent implements OnInit {

  @Input() record:SearchResponse;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  addReservation(){
    this.router.navigate(['/reservation/create'],{state:{record:this.record}});
  }

}
