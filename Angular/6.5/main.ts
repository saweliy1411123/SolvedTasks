// Post-запросы

// ещё есть POST, PUT, DELETE.

// Приложение Node.js на стороне сервера

// сначала определим веб-приложение Node.js которое будет на стороне сервера получать запросы от нашего Angular-приложения
// для работы необходимо установить пакет "express"
// Приложение будет обрабатывать запросы по адресу http://localhost:3000/postuser
// предполагается что серверу будет приходить некий объект у которого есть два поля name и age 
// (например, {name: "Tom", age: 25})




const express = require("express");
   
const app = express();
   
// создаем парсер для данных в формате json
const jsonParser = express.json();
 
// настройка CORS
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
   next();  // передаем обработку запроса методу app.post("/postuser"...
 });
  
// обработчик по маршруту localhost:3000/postuser
app.post("/postuser", jsonParser, function (request, response) {
 
    // если не переданы данные, возвращаем ошибку
    if(!request.body) return response.sendStatus(400);
     
    // получаем данные
    let username = request.body.name;
    let userage = request.body.age;
    // имитируем некоторую обработку данных, например, изменим значение userage
    userage = userage + 10;
     
    // отправка данных обратно клиенту
    response.json({"name": username, "age": userage});
});
  
app.listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000/"));

// приложение использует фреймворк Express, для работы надо установить express
// приложение будет обрабатывать запросы по адресу http://localhost:3000/postuser
// Предполагается что серверу будет приходить объект с полями name и age (например, {name: "Tom", age: 25})
// после получения данных сервер сделает обработку, например увеличить значения поля age на 10 
// И затем отправим измененный объект обратно приложению Angular

// в файле src/app/user.ts определен класс User, который предсталвяет отправляемые и получаемые данные

export class User{
    constructor(public name:string, public age:number){}
}

// далее в файле src/app/http.service.ts определим сервис для отправки данных

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
    
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
  
    // метод который получает для отправки объект User 
    // сами отправляемые данные - объект body. Для отправки применяется метод http.post()
    // в который передаётся адрес сервера и отправляемый объект
    postData(user: User){
           
        const body = {name: user.name, age: user.age};
        return this.http.post("http://localhost:3000/postuser", body); 
    }
}


// существуют ограничения кроссдоменных запросов 
// поэтому должна быть включена CORS, для тестирования вне зависимости от технологии сервера 

// Применим сервис в коде компонента
import { Component} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
 
import { HttpService} from "./http.service";
import { User } from "./user";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule, FormsModule],
    template: `<div>
                <p>
                    <label>Имя</label><br>
                    <input name="username" [(ngModel)]="user.name" />
                </p>
                <p>
                    <label>Возраст</label><br>
                    <input type="number" name="age" [(ngModel)]="user.age" />
                </p>
                    <button class="btn btn-default" (click)="submit(user)">Отправить</button>
                </div>
                @if(done){
                    <h3>Ответ сервера</h3>
                    <div>
                        Имя: {{receivedUser?.name}}<br>
                        Возраст: {{receivedUser?.age}}
                    </div>
                }`,
    providers: [HttpService]
})
export class AppComponent { 
    
    user: User=new User("", 0); // данные вводимого пользователя
        
    receivedUser: User | undefined; // полученный пользователь
    done: boolean = false;
    constructor(private httpService: HttpService){}
    submit(user: User){
        this.httpService.postData(user)
                .subscribe({
                    next:(data: any) => {this.receivedUser=data; this.done=true;},
                    error: error => console.log(error)
                });
    }
}

// в шаблоне опредлена форма ввода
// По нажатию на кнопку данные отправляются на сервер а полученный ответ отображается под формой
// при получении данных с сервера следует учитывать регистр св-в
// для св-в класса в TS применяется camelCase

// для отправки можем передать весь объект 

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
    
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
  
    postData(user: User){     
        return this.http.post("http://localhost:3000/postuser", user); 
    }
}

// также при отправке мы можем устанавливать различные заголовки с помощью объекта HttpHeaders

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
    
@Injectable()
export class HttpService{
    
    constructor(private http: HttpClient){ }
  
    postData(user: User){     
        const myHeaders = new HttpHeaders().set("Accept", "application/json");
        return this.http.post("http://localhost:3000/postuser", user, {headers:myHeaders}); 
    }
}