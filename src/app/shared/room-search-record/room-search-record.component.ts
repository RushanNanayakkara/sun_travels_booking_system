import { Component, Input, OnInit } from '@angular/core';
import { SearchResponse } from '../models/responses/SearchResponse';

@Component({
  selector: 'app-room-search-record',
  templateUrl: './room-search-record.component.html',
  styleUrls: ['./room-search-record.component.scss']
})
export class RoomSearchRecordComponent implements OnInit {

  @Input() record:SearchResponse;

  constructor() { }

  ngOnInit(): void {
    this.record.roomType = {
      name:"Some room type",
    description:`this is a dummy description.this is a dummy description.this is a dummy description.this is a dummy description.this is a dummy 
             description.this is a dummy description.this is a dummy description.this is a dummy description.`
    }
  }

}
