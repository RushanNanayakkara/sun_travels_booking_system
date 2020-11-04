import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationViewComponent } from './reservation-view/reservation-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';


@NgModule({
  declarations: [ReservationCreateComponent, ReservationViewComponent, ReservationSummaryComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ReservationModule { }
