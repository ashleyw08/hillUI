import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingRoutingModule } from './app-routing-routing.module';
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { IraComponent } from '../ira/ira.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'iras', component: IraComponent},
  {path: '', component: HomeComponent}

];

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule,
    AppRoutingRoutingModule
  ]
})
export class AppRoutingModule { }
