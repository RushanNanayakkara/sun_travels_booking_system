import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomSearchRecordComponent } from './room-search-record/room-search-record.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { ReservationRecordComponent } from './reservation-record/reservation-record.component';
import { ConfirmDialogComponent } from './modal/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InputSelectComponent } from './inputs/input-select/input-select.component';
import { InputTextAreaComponent } from './inputs/input-text-area/input-text-area.component';

const sharedComponents =[
  TextfieldComponent,
  SideNavComponent,
  TitleBarComponent,
  UnauthorizedComponent, 
  PageNotFoundComponent, 
  SignInComponent,
  RoomSearchRecordComponent,
  InputTextComponent,
  ReservationRecordComponent,
  ConfirmDialogComponent,
  InputSelectComponent,
  InputTextAreaComponent
]

const nativeModules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule
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
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule 
]

@NgModule({
  declarations: [...sharedComponents],
  imports: [...nativeModules, ...externalModules],
  exports:[...nativeModules, ...externalModules ,...sharedComponents]
})
export class SharedModule { }
