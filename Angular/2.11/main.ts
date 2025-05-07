// Взаимодействие между модулями
// создадим в src/app/data два файла data.module.ts и data.component.ts
// которые будут представлять ф-ность нового модуля

// в data.component.ts определим компонент DataComponent

import { Component} from "@angular/core";
        
@Component({
    selector: 'data-comp',
    template: `<div><h3>{{message}}</h3></div>`
})
export class DataComponent{ 
      
    message: string = "DataModule";
}

// А в файле data.module.ts определим класс модуля DataModule:

import { NgModule }      from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DataComponent }   from './data.component';
// в данном модуле мы можем подключать другие модули которые собираемся использовать в рамках текущего модуля и его компонентов и директивы
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ DataComponent],
    exports: [ DataComponent] // экспортируем компонент, для подключения вдругих модулях
})
export class DataModule { }

// теперь используем ф-нал DataModule в главном модуле AppModule в файле app.module.ts
import { NgModule }      from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { DataModule }   from './data/data.module';
   
@NgModule({
    imports:      [ BrowserModule, DataModule],
    declarations: [ AppComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }

// модули которые мы определили сами, подключаются также как и все остальные модули в секции imports
// и после этого мы можем использовать ф-ность DataModule в компонентах, которые принадлежат AppModule
// Например, используем DataComponent в компоненте AppComponent в файле app.component.ts

import { Component} from "@angular/core";
    
@Component({
    selector: "my-app",
    standalone: true,
    template: `<div>
                    <h1>AppModule</h1>
                    <data-comp></data-comp>
               </div>`
})
export class AppComponent {}

// в файле main.ts загружаем модуль AppModule
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

