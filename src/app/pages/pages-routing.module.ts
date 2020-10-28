import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"hotel",
        loadChildren:() =>
          import('./hotel/hotel.module').then((m) => m.HotelModule),
      },
      {
        path:"contract",
        loadChildren:() =>
          import('./contract/contract.module').then((m) => m.ContractModule),
      },
      {
        path:"employee",
        loadChildren:() =>
          import('./employee/employee.module').then((m) => m.EmployeeModule),
      },
      {
        path:"search",
        loadChildren:() =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path:"account",
        loadChildren:() =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path:"activity",
        loadChildren:() =>
          import('./activity/activity.module').then((m) => m.ActivityModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
