import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivitiesComponent } from './activities/activities.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [ActivitiesComponent],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    MatTableModule
  ]
})
export class ActivityModule { }
