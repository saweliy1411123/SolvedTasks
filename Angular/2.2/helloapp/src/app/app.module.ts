import { NgModule }      from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
 
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }