// HTTP и взаимодействие с сервером HttpClient и отправка запросов

// для взаимодействие с сервером и отправки запросов по протоколу http 
// используется класс HttpClient
// у него есть ряд методов отправки: GET, POST, PUT, DELETE.
// данный класс построен поверх объекта в JS - XMLHttpRequest

// для использования надо использовать @angular/common

{
    "name": "helloapp",
    "version": "1.0.0",
    "description": "First Angular 19 Project",
    "author": "Eugene Popov metanit.com",
    "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build"
    },
    "dependencies": {
        "@angular/common": "~19.0.0",
        // остальные пакеты
    },
    "devDependencies": {
          
        // остальные пакеты
    }
}

// а также в компоненте должен быть импортирован класс HttpClientModule из "@angular/common/http"

import { Component} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
 
@Component({
    imports: [HttpClientModule],



// определим обращение по сети к файлу json, который будет хранить некоторые данные
// в папке src определим папку assets, и в ней добавим data.json

{
    "name": "Bob",
    "age": 28
}

// для представления данных добавим в src/app новый файл user.ts

export class User{
    constructor(public name:string, public age:number){}
}


// для отправки запроса определим в компоненте AppComponent 
import { Component, OnInit} from "@angular/core";
import { HttpClient, HttpClientModule} from "@angular/common/http";
import {User} from "./user";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule],
    // вывод данных объекта User, которые получаем с сервера
    template: `<div>
                    <p>Имя пользователя: {{user?.name}}</p>
                    <p>Возраст пользователя: {{user?.age}}</p>
               </div>`
})
export class AppComponent implements OnInit { 
    
    user: User | undefined;
  
    constructor(private http: HttpClient){}
       
    ngOnInit(){
           
        this.http.get("assets/data.json").subscribe({next:(data:any) => this.user=new User(data.name, data.age)});
    }
}

// однако загрузка данных в конструкторе компонента не очень желательна.
// метод ngOnInit(), который определен в интерфейсе OnInit и который вызывается при инициализации компонента
// представлеяет более предпочтительное место для загрузки данных 
// в конструкторе просто получаем сервис HttpClient

// Далее в методе ngOnInit() получаем данные из сервиса. Сам метод http.get() возвращает объект Observable<Object>
// Observable представляет "поток" и для прослушивания событий из этого "потока" применяется метод subscribe
// Этот метод определяет действие над результатом запроса - полученными с сервера данными.
// определено с помощью параметра next в виде стрелочной функции
// так как между схемой класса User и данными из файла json есть прямое сопоставление, то получаемые данные мы можем передать в конструктор класса User.

(data:any) => this.user=new User(data.name, data.age)

// поскольку файл json представляет вспомогательный файл, то нам надо указать angular cli, что
// в файле angular.json с помощью параметра "assets": ["src/assets"] он определён:

{
  "version": 1,
  "projects": {
    "helloapp": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/helloapp",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
 
            "assets": ["src/assets"],
 
            "aot": true
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "helloapp:build"
          }
        }
      }
    }
  }
}

// в итоге мы увидим загруженные данные из файла data.json



// Создание сервиса

// обращения к серверу происходят из вспомогательных сервисов
// так как сервис может определять доп. логику обработки полученных с сервера данных, может сделать код компонента перегруженным
// компоненты выступают в качестве потребителей данных, которые получены от сервисов

// для работы с http добавм в папку src/app новый файл http.service.ts

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
  
// для отправки запросов сервис получает объект HttpClient
// применяется декоратор @Injectable, который гарантирует, что встроенный механизм внедрения зависимосетй сможет создать объект этого класса и передать его в качестве зависимости в другой объект (в другой сервис или компонент)
@Injectable()
export class HttpService{
  
    constructor(private http: HttpClient){ }
      
    getData(){
        // для выполнения get-запроса у объекта HttpClient вызывается метод get
        // в который передаётся адрес запроса (файл с данными)
        return this.http.get("assets/data.json")
    }
}

// Используем этот сервис в компоненте AppComponent

import { Component, OnInit} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
 
import { HttpService} from "./http.service";
import {User} from "./user";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule],
    template: `<div>
                    <p>Имя пользователя: {{user?.name}}</p>
                    <p>Возраст пользователя: {{user?.age}}</p>
               </div>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
    
    user: User;
       
    constructor(private httpService: HttpService){}
       
    ngOnInit(){
           
        this.httpService.getData().subscribe({next:(data:any) => this.user=new User(data.name, data.age)});
    }
}



// Загрузка сложных данных

// поскольку определение json-файла соответствует определению класса User, 
// поэтому this.user = new User(data.name, data.age) пройдёт успешно 
// таким образом мы можем загружать и более сложные данные

// изменим файл data.json

{ 
    "userList":
    [{
        "name": "Bob",
        "age": 28
    },{
        "name": "Tom",
        "age": 45
    },{
        "name": "Alice",
        "age": 32
    }]
}

// в классе HttpService загружаем данные из data.json

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
       
    getData(){
        return this.http.get("assets/data.json")
    }
}

// изменим код компонента

import { Component, OnInit} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
 
import { HttpService} from "./http.service";
import {User} from "./user";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule],
    template: `<ul>
                @for(user of users; track $index){
                    <li>
                        <p>Имя пользователя: {{user?.name}}</p>
                        <p>Возраст пользователя: {{user?.age}}</p>
                    </li>
            }
            </ul>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
    
    users: User[]=[];
      
    constructor(private httpService: HttpService){}
       
    ngOnInit(){
           
        this.httpService.getData().subscribe({next: (data: any) => this.users=data["userList"]});
    }
}

// мы получаем массив объектов User. 
// Но напрямую данные из файла "data.json" не соответствуют массиву
// Массив в файле определен по ключу "userList". 
// с его помощью достаем нужные данные this.users=data["userList"]