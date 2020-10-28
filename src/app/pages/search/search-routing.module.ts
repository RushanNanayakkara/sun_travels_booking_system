import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/page-not-found/page-not-found.component';
import { SearchAdminComponent } from './search-admin/search-admin.component';

const routes: Routes = [
  {
    path:"",
    component:PageNotFoundComponent
  },
  {
    path:"admin",
    component:SearchAdminComponent
  },
  {
    path:"room",
    loadChildren:() =>
      import('./search-room/search-room.module').then((m) => m.SearchRoomModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
