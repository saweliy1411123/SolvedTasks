// Отправка данных в запросе

// нередко возникает необходимость обращаться с более сложными запросами к удаленному ресурсу передавая ему некоторые параметры


// Определение приложения на сервере
// рассмотрим задачу, на стороне сервера действует некоторый обработичк или скрипт, который в качестве параметра принимает два числа и вычисляет сумму

// в качестве стороны сервера определим приложение Node.js 
// определим каталог C:\node, далее определим package.json

{
  "name": "simple-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "4.18.2"
  }
}

// npm install

// далее определим в папке приложения файл app.js 

const express = require("express");
    
const app = express();
  
// обработчик по маршруту localhost:3000/sum
app.get("/sum", function(request, response){
        
    // получаем параметры из строки запроса и преобразуем в числа
    const number1 = parseInt(request.query.num1);
    const number2 = parseInt(request.query.num2);
  
    // вычисляем сумму
    const sum = number1 + number2;
      
    // настройка заголовков CORS для кроссдоменных запросов
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
      
    response.send({result: sum});
});
   
app.listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000/"));

// так как приложение Node.js и Angular разворачиваются на разном домене 
// то необходимо будет настроить CORS - кроссдоменные запросы
// для этого с помощью метода response.header устаналивается соответствующие заголовки

// в cmd перейдем к папке приложения node.js и запустим скрипт с помощью 
// c:\node>node app.js
// Мы можем простестировать приложение в браузере, 
// обратившись к нему с запросом http://localhost:3000/sum?num1=5&num2=9:



// Определение клиентского приложения Angular


// для отправки запроса из Angular опрелим сервис
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
   
@Injectable()
export class HttpService{
   
    constructor(private http: HttpClient){ }
      
    getSum(num1: number, num2: number){
        return this.http.get("http://localhost:3000/sum?num1=" + num1 + "&num2=" + num2);
    }
}

// поскольку данные передаются через запрос GET, то мы можем конкатенировать нужное число со строкой запроса
// код компонента

import { Component} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from "@angular/forms";
 
import { HttpService} from "./http.service";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule, FormsModule],
    template: `<div>
                <p>
                    <label>Введите первое число</label><br>
                    <input type="number" name="num1" [(ngModel)]="num1" />
                <p>
                <p>
                    <label>Введите второе число</label><br>
                    <input type="number" name="num2" [(ngModel)]="num2" />
                </p>
                    <button (click)="submit()">Отправить</button>
                </div>
                @if(done){ 
                    <div>Сумма: {{sum}}</div> 
                }
`,
    providers: [HttpService]
})
export class AppComponent { 
     
    num1: number = 0;
    num2: number = 0;
    sum: number | undefined;
    done: boolean = false;
    constructor(private httpService: HttpService){}
    submit(){
        this.httpService.getSum(this.num1, this.num2).subscribe({next:(data:any) => {
            this.sum=data.result; 
            this.done=true;
        }});
    }
}

// по нажатию на кнопку отправляем введенное число на сервер и поверх формы ввода отображаем полученный результат

// HttpParams
// можно использовать для определения параметров
// изменим сервис HttpService следующим образом

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
    
@Injectable()
export class HttpService{
      
    constructor(private http: HttpClient){ }
       
    getSum(num1: number, num2: number){
        const params = new HttpParams()
        .set("num1", num1.toString())
        .set("num2", num2.toString());
        return this.http.get("http://localhost:3000/sum", {params});
    }
}

// с помощью метода set() объекта HttpParams устанавливаются параметры и затем этот метод передается в запрос
// в итоге результтат будет такой же