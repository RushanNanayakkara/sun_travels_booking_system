import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guard/admin-guard/admin.guard';
import { EmployeeGuard } from '../guard/employee-guard/employee.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:"",
    component:LayoutComponent,
    children:[
      {
        path:"hotel",
        canActivate:[AdminGuard],
        loadChildren:() =>
          import('./hotel/hotel.module').then((m) => m.HotelModule),
      },
      {
        path:"contract",
        canActivate:[AdminGuard],
        loadChildren:() =>
          import('./contract/contract.module').then((m) => m.ContractModule),
      },
      {
        path:"employee",
        canActivate:[AdminGuard],
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
      },
      {
        path:"reservation",
        canActivate:[EmployeeGuard],
        loadChildren:() =>
          import('./reservation/reservation.module').then((m) => m.ReservationModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
