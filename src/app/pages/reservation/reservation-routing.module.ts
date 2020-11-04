import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"create"
  },
  {
    path:"create",
    component:ReservationCreateComponent
  },
  {
    path:"view",
    component:ReservationViewComponent
  },
  {
    path:"view/:uuid",
    component:ReservationViewComponent
  },
  {
    path:"summary",
    component:ReservationSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
