import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoomRoutingModule } from './search-room-routing.module';
import { SearchRoomResultComponent } from './search-room-result/search-room-result.component';
import { SearchRoomSearchComponent } from './search-room-search/search-room-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SearchRoomResultComponent, SearchRoomSearchComponent],
  imports: [
    CommonModule,
    SearchRoomRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class SearchRoomModule { }
