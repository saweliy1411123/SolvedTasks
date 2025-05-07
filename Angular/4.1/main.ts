// Сервисы и dependency injection

// Стандартные задачи сервисов
// 1) Предоставление данных приложению
// 2) Сервис может представлять канал взаимодействия между отдельными компонентами приложения
// 3) Сервис может икапсулировать бизнес-логику, различные вычислительные задачиЮ задачи по логированию
// которые лучше выносить из компонентов, может решить проблему повторения кода

// добавим в папку src/app новый файл data.service.ts
// Этот файл будет содержать код сервис, обязательно указываем .service согласно условностям

// если много слов в названии то он разделяется дефисами
// SpecialSuperHeroService -> special-super-hero.service.ts.

export class DataService{
  
    private data: string[] = [ "Tom", "Bob",  "Sam"];
      
    getData(): string[] {
          
        return this.data;
    }
    addData(name: string){
          
        this.data.push(name);
    }
}


// определим код компонента

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {DataService} from "./data.service"; // импортируем 
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule], // подключаем, чтобы использовать директиву ngModel
    providers: [DataService], // и добавляем в providers
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
    // здесь мы можем получить объект сервиса в конструкторе компонента и использовать по необходимости
    constructor(private dataService: DataService){}
       
    addItem(name: string){
           
        this.dataService.addData(name);
    }
    // для загрузки используем ngOnInit 
    ngOnInit(){
        this.items = this.dataService.getData();
    }
}
