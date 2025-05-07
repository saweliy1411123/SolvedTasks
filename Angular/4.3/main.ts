// Опциональные сервисы

// сервис может быть необязательным

// сервис LogService 
export class LogService{
  
    write(logMessage:string){
          
        console.log(logMessage);
    }
}

// DataService использующий LogService 

import {Injectable} from "@angular/core";
import {LogService} from "./log.service";
 
@Injectable()
export class DataService{
  
    private data: string[] = [ "Tom", "Bob",  "Sam"];
    constructor(private logService: LogService){}
      
    getData(): string[] {
          
        this.logService.write("операция получения данных");
        return this.data;
    }
    addData(name: string){
          
        this.data.push(name);
        this.logService.write("операция добавления данных");
    }
}

// по какой то причине сервис LogService не доступен для индектирования например из за недобавления в провайдера компонента AppComponent

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    providers: [DataService],       // Добавлен только сервис DataService
    template: `<div>
        <div><input [(ngModel)]="name" />
            <button (click)="addItem(name)">Добавить</button>
        </div>
        <ul>
        @for(item of items; track $index){
            <li>{{item}}</li>
        }
        </ul>
    </div>`
})
export class AppComponent{ 
       
    items: string[] = [];
    name: string = "";
    constructor(private dataService: DataService){}
       
    addItem(name: string){
           
        this.dataService.addData(name);
    }
    ngOnInit(){
        this.items = this.dataService.getData();
    }
}

// если мы запустим то получим ошибку, поэтому мы можем определить сервис LogService как опциональный, применяя декоратор Optional

import {Injectable, Optional} from "@angular/core";
import {LogService} from "./log.service";
 
@Injectable()
export class DataService{
  
    private data: string[] = [ "Tom", "Bob",  "Sam"];
    // опциональный сервис
    constructor(@Optional() private logService: LogService){}
       
    getData(): string[] {
        
        if (this.logService) this.logService.write("операция получения данных");
        return this.data;
    }
    addData(name: string){
           
        this.data.push(name);
        if (this.logService) this.logService.write("операция добавления данных");
    }
}