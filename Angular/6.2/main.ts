// Объект Observable и библиотека RxJs

// методы класса HttpClient после выполнения запроса возвращают объект Observable<any>,
// который определен в библиотеке RxJS ("Reactive Extensions")
// эта библиотека реализует паттерн "асинхронный наблюдатель"
// выполнение запроса к серверу с помощью класса HttpClient выполняются в асинхронном режиме

// добавляем в проект зависимость rxjs

{
    "name": "helloapp",
    "version": "1.0.0",
    "description": "First Angular 19 Project",
    "author": "Eugene Popov <metanit.com>",
    "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build"
    },
    "dependencies": {
        "rxjs": "~7.8.1",
        // остальное содержимое секции
    },
    "devDependencies": {
        // содержимое секции
    }
}

// в файле src/assets/data.json определим данные 

{ 
    "userList":
    [{
        "userName": "Bob",
        "userAge": 28
    },{
        "userName": "Tom",
        "userAge": 39
    },{
        "userName": "Alice",
        "userAge": 32
    }]
}

// в качестве модели данных используем класс User, определенный в файле src/app/user.ts

// то есть в данном случае у нас нет соответствия по именам св-в:
// name - username и age - userage

export class User{
    constructor(public name:string, public age:number){}
}

// Определим следующий код сервиса, который будет получать данные из user.json
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
// для использования элементов библиотеки RxJS, и надо испортировать 
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
    
@Injectable()
export class HttpService{
     
    constructor(private http: HttpClient){ }
    // смысл использования специального сервиса заключается в сокрытии деталей отправки запроса
    // компонент же ожидает получить какие-то конкретные данные, например в виде набора объектов User.
    // в итоге весь метод возвращает Observable<User[]>
    getUsers() : Observable<User[]> {
// с помощью метода map библиотеки rxjs можно преобразовать данные из одного формата в другой
// у результата метода get() мы можем вызвать метод pipe(), который позволяет обработать результаты 
// для этого в качестве первого параметра принимает ф-ю обработки данных запроса (map), который преобразует результаты запроса в новые объекты 
        return this.http.get("assets/data.json").pipe(map((data:any)=>{
            let usersList = data["userList"];
            return usersList.map(function(user: any): User {
                return new User(user.userName, user.userAge);
              });
        }));
    }
}

// теперь используем сервис в классе компонента 

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
                    <li>{{user?.name}} ({{user?.age}})</li>
            }
            </ul>`,
    providers: [HttpService]
})
export class AppComponent implements OnInit { 
    
    users: User[]=[];
      
    constructor(private httpService: HttpService){}
       
    ngOnInit(){
           
        this.httpService.getUsers().subscribe({next:(data: User[]) => this.users=data});
    }
}


