import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoomRoutingModule } from './search-room-routing.module';
import { SearchRoomResultComponent } from './search-room-result/search-room-result.component';
import { SearchRoomSearchComponent } from './search-room-search/search-room-search.component';


@NgModule({
  declarations: [SearchRoomResultComponent, SearchRoomSearchComponent],
  imports: [
    CommonModule,
    SearchRoomRoutingModule
  ]
})
export class SearchRoomModule { }
