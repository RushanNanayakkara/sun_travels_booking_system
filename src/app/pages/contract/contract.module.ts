import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractsComponent } from './contracts/contracts.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractViewComponent } from './contract-view/contract-view.component';


@NgModule({
  declarations: [ContractsComponent, ContractCreateComponent, ContractViewComponent],
  imports: [
    CommonModule,
    ContractRoutingModule
  ]
})
export class ContractModule { }
