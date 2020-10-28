import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextfieldComponent } from './inputs/textfield/textfield.component';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { TitleBarComponent } from "./title-bar/title-bar.component";

import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';

const sharedComponents =[
  TextfieldComponent,
  SideNavComponent,
  TitleBarComponent
]

const nativeModules = [
  CommonModule
]

const externalModules = [
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatDividerModule,
  MatListModule
]

@NgModule({
  declarations: [...sharedComponents, UnauthorizedComponent, PageNotFoundComponent, SignInComponent],
  imports: [...nativeModules, ...externalModules],
  exports:[...nativeModules, ...externalModules ,...sharedComponents]
})
export class SharedModule { }
