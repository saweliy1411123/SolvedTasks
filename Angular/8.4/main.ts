// AsyncPipe

// по умолчанию является impure
// позволяет получить резуьлтат асинхронной операции
// отслеживает объекты Observable и Promise
// возвращает полученное из этих объектов значение 
// после получения сигнализирует компоненту что надо проверить изменения
// если компонент уничтожается, то он автоматически отписывается от объектов Observable и Promise


// используем AsyncPipe в компоненте AppComponent

import { Component} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import { Observable, interval } from "rxjs";
import { map } from "rxjs/operators";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [AsyncPipe],
    template: `<p>Модель: {{ phone| async }}</p>
               <button (click)="showPhones()">Посмотреть модели</button>`
})
export class AppComponent { 
  
    phones = ["iPhone 15 Pro", "Xiaomi 14 Pro", "Infinix NOTE 30", "Samsung Galaxy A24", "realme C53"];
      
    phone: Observable<string>|undefined;
    constructor() { this.showPhones(); }
    
    // здесь с периодичностью в 500 мл в шаблон компонента передается очередной элемент из массива phones
    showPhones() {
        this.phone = interval(500).pipe(map((i:number)=> this.phones[i]));
    }
}

// Компонент не должен подписываться на асинхронное получение данных, обрабатывать их
// а при уничтожении отписываться от получения данных
// всю эту работу делает AsyncPipe

// Его очень удобно применять например при загрузке данных из сети


// в файле http.service.ts определим сервис, который получает данные с сервера

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
       
    getUsers(){
        return this.http.get("assets/users.json");
    }
}

// для хранения данных в папке src/assets определим файл users.json

[{
    "name": "Bob",
    "age": 49
},{
    "name": "Tom",
    "age": 39
},{
    "name": "Alice",
    "age": 34
}]


// в файле app.component.ts используется сервис

import { Component, OnInit} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import { HttpClientModule } from "@angular/common/http"; 
import { Observable } from "rxjs";
import { HttpService} from "./http.service";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule, AsyncPipe],
    template: `<ul>
                @for(user of users | async; track $index){
                    <li>{{user.name}} ({{user.age}})</li>
                } 
                </ul>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
     
    users: Observable<Object>|undefined;;
    constructor(private httpService: HttpService){}
    // запускается загрузка данных 
    ngOnInit(){
            
         this.users = this.httpService.getUsers();
    }
}