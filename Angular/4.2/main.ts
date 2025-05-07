// Внедрение сервиса в другой сервис

// если мы захотим использовать один сервис в другом
// для логгирования определим новый сервис

// Для этого в папку src/app добавим новый файл log.service.ts

export class LogService{
 
    write(logMessage:string){
         
        console.log(logMessage);
    }
}

// код в файле data.service.ts

// чтобы указать, что сервис может использовать другие сервисы 
// указываем Injectable
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


// также как и в случае с DataService сервис LogService тоже надо зарегать
// в списке провайдеров AppComponent

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service";
import {LogService} from "./log.service";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    providers: [DataService, LogService],
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