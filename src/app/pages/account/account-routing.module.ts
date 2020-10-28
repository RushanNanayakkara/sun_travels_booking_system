import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountViewComponent } from './account-view/account-view.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"view"
  },
  {
    path:"view",
    component:AccountViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
