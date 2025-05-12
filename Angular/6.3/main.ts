// Обработка ошибок 

// при работе с сетью и http происходят различные ошибки
// Перехват ошибок позволит выяснить проблему и обработать их, например выводом сообщения об ошибке

// для перехвата можно использовать ф-ю catchError()

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";
import { map, catchError} from "rxjs/operators";
  
@Injectable()
export class HttpService{
     
    // определяется переменная которая будет хранить информацию об ошибке
    // для имитации ошибки заведомо передается несущ. адрес "users.json"
    errorMessage: String = "";
    constructor(private http: HttpClient){ }
         
    getUsers() : Observable<User[]> {
        // сюда передаётся в качестве второго параметра ф-я для обработки ошибок
        return this.http.get("assets/users.json").pipe(map((data:any)=>{
            let usersList = data["userList"];
             
            return usersList.map(function(user:any) : User {
                return new User(user.userName, user.userAge);
              });
        }),
        // в качестве подобной ф-и здесь применяется ф-я catchError()
        // в качестве параметра catchError принимает ф-ю, в которой передаётся объект ошибки, возникшей при выполнении запроса
        // таким образом, мы можем получить ошибку и обработать её
        catchError(err => {  
            console.log(err); 
            // ошибка представляет объект из которого мы можем получить ряд данных
            // в частности св-во message позволяет получить сообщение об ошибке, а свойство status - статусный код ответа
            this.errorMessage = err.message;
            return [];
        }))
    };
}

// этот объект выводится на консоль, а св-ву errorMessage сервиса передается сообщение об ошибке, при успешном - пустая строка

// стоит отметить что в ф-и обработки ошибки нам всё равно надо вернуть объект Observable
return [];


// далее будет создан объект Observable<User[]>, который будет содержать пустой массив объектов User

// используем сервис и для этого изменим код компонента AppComponent

import { Component, OnInit} from "@angular/core";
import { HttpClientModule} from "@angular/common/http";
 
import { HttpService} from "./http.service";
import {User} from "./user";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [HttpClientModule],
    // для получения информации об ошибке компонент обращается к св-ву errorMessage сервиса и выводит его значение
    template: `<div>{{this.httpService.errorMessage}}</div>
            <ul>
                @for(user of users; track $index){
                    <li>{{user?.name}} ({{user?.age}})</li>
            }
            </ul>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
    
    users: User[]=[];
      
    constructor(public httpService: HttpService){}
       
    ngOnInit(){
        // с помощью метода subscribe() компонент может получить из сервиса массив объектов User, если ошибка то пустой массив
        this.httpService.getUsers().subscribe({next:(data: User[]) => this.users=data});
    }
}


