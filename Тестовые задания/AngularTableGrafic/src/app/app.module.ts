import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { TableAreaComponent } from './finance/financeTransactions/table-area/table-area.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    TableAreaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 