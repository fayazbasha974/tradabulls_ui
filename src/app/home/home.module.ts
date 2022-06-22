import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IndicesComponent } from './indices/indices.component';
import { EquitiesListComponent } from './equities-list/equities-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    IndicesComponent,
    EquitiesListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
