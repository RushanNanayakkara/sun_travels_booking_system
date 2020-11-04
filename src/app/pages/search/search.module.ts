import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchAdminComponent } from './search-admin/search-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SearchAdminComponent,],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ]
})
export class SearchModule { }
