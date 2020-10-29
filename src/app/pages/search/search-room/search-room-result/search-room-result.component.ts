import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/search/search.service';

@Component({
  selector: 'app-search-room-result',
  templateUrl: './search-room-result.component.html',
  styleUrls: ['./search-room-result.component.scss']
})
export class SearchRoomResultComponent implements OnInit {

  constructor(
    private searchService:SearchService,
    private router:Router
    ) { }

  ngOnInit(): void {
    console.log(history.state.response);
  }

}
