import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './hotel/hotel.component';
import { HotelViewComponent } from './hotel-view/hotel-view.component';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [HotelComponent, HotelViewComponent, HotelCreateComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    SharedModule,
    MatTableModule,
    MatDividerModule
  ]
})
export class HotelModule { }
