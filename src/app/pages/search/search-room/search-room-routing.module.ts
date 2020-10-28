import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchRoomResultComponent } from './search-room-result/search-room-result.component';
import { SearchRoomSearchComponent } from './search-room-search/search-room-search.component';

const routes: Routes = [
  {
    path:"",
    component:SearchRoomSearchComponent
  },
  {
    path:"result",
    component:SearchRoomResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoomRoutingModule { }
