import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountViewComponent } from './account-view/account-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AccountViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ],
  providers:[
  ]
})
export class AccountModule { }
