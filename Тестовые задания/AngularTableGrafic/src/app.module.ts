import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ChartsComponent } from './charts/charts.component';
import { routes } from './app.routes'; 

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
