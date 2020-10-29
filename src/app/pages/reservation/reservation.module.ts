import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReservationCreateComponent, ReservationViewComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReservationModule { }
