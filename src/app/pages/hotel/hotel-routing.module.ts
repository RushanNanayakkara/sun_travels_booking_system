import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { HotelComponent } from './hotel/hotel.component';

const routes: Routes = [
  {
    path:"",
    redirectTo: "hotels"
  },
  {
    path:"hotels",
    component:HotelComponent
  },
  {
    path:"create",
    component:HotelCreateComponent
  },
  {
    path:"view",
    component:HotelViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
