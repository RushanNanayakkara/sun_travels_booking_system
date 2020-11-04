import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard/auth-guard.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule )
  },
  {
    path:"sign-in",
    component:SignInComponent
  },
  {
    path:"unauthorized",
    component:UnauthorizedComponent
  },
  {
    path:"**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
