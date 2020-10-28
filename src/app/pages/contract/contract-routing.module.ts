import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractViewComponent } from './contract-view/contract-view.component';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"all"
  },
  {
    path:"all",
    component:ContractsComponent
  },
  {
    path:"create",
    component:ContractCreateComponent
  },
  
  {
    path:"view",
    component:ContractViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
