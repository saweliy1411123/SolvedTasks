// Один сервис для всех компонентов

// определим компонент для работы с данными в src/app, data.component.ts

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
import {LogService} from "./log.service";
         
@Component({
    selector: "data-comp",
    standalone: true,
    imports: [FormsModule],
    providers: [DataService, LogService], // для работы с сервисами
    template: `<div>
        <div><input [(ngModel)]="newItem" />
            <button (click)="addItem(newItem)">Добавить</button>
        </div>
        <ul>
        @for(item of items; track $index){
            <li>{{item}}</li>
        }
        </ul>
    </div>`
})
export class DataComponent{ 
       
    newItem : string = "";
    items: string[] = [];
    constructor(private dataService: DataService){}
       
    addItem(name: string){
           
        this.dataService.addData(name);
    }
    ngOnInit(){
        this.items = this.dataService.getData();
    }
}

// используем этот компонент DataComponent в главном компоненте приложения AppComponent

import { Component} from "@angular/core";
import { DataComponent } from "./data.component";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [DataComponent],
    // создает два блока с кодом, независимых друг от друга
    template: `<data-comp></data-comp>
               <data-comp></data-comp>`
})
export class AppComponent {}




// возможно потребуется чтобы компоненты использовали один и тот же объект сервиса
// вместо создания разных сервисов для каждого компонента
import { Component} from "@angular/core";
import { DataComponent } from "./data.component";
import {DataService} from "./data.service";
import {LogService} from "./log.service";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [DataComponent],
    providers: [DataService, LogService],
    template: `<data-comp></data-comp>
               <data-comp></data-comp>`
})
export class AppComponent{ }

// в этом случае можем убрать регистрацию сервисов из компонента DataComponent
// но теперь здесь, будут зависимые блоки кода 
import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
         
@Component({
    selector: "data-comp",
    standalone: true,
    imports: [FormsModule],
    template: `<div>
        <div><input [(ngModel)]="newItem" />
            <button (click)="addItem(newItem)">Добавить</button>
        </div>
        <ul>
        @for(item of items; track $index){
            <li>{{item}}</li>
        }
        </ul>
    </div>`
})
export class DataComponent{ 
       
    newItem : string = "";
    items: string[] = [];
    constructor(private dataService: DataService){}
       
    addItem(name: string){
           
        this.dataService.addData(name);
    }
    ngOnInit(){
        this.items = this.dataService.getData();
    }
}