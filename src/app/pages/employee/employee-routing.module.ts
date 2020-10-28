import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"all"
  },
  {
    path:"all",
    component:EmployeesComponent
  },
  {
    path:"create",
    component:EmployeeCreateComponent
  },
  {
    path:"view",
    component:EmployeeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }