import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchAdminComponent } from './search-admin/search-admin.component';


@NgModule({
  declarations: [SearchAdminComponent,],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
