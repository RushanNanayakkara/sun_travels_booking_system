import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';


@NgModule({
  declarations: [ReservationCreateComponent, ReservationViewComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
