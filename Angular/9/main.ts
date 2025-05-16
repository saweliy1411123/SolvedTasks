// Grid и CRUD операции

// создадим новый каталог для нашего приложения 
// gridapp, определим в проекте файл package.json

{
  "name": "gridapp",
  "version": "1.0.0",
  "description": "Grid Angular 19 Project",
  "author": "Eugene Popov metanit.com",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build"
  },
    "dependencies": {
    "@angular/common": "~19.0.0",
    "@angular/compiler": "~19.0.0",
    "@angular/core": "~19.0.0",
    "@angular/forms": "~19.0.0",
    "@angular/platform-browser": "~19.0.0",
    "@angular/platform-browser-dynamic": "~19.0.0",
    "@angular/router": "~19.0.0",
    "rxjs": "~7.8.1",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~19.0.0",
    "@angular/cli": "~19.0.0",
    "@angular/compiler-cli": "~19.0.0",
    "typescript": "~5.5.0"
  }
}

// установить все пакеты с помощью npm install

// далее tsconfig.json с конфигурацией

{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "ES2022",
    "moduleResolution": "node",
    "target": "ES2022",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "ES2022",
      "dom"
    ]
  },
    "files": [ "src/main.ts" ],
    "include": [ "src/**/*.d.ts"]
}


// также angular.json

{
  "version": 1,
  "projects": {
    "gridapp": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "aot": true
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "gridapp:build"
          }
        }
      }
    }
  }
}

// затем в проект создадим папку src/app/user.ts

// описывает используемые данные
export class User{
    constructor(
        public _id: string,
        public name: string,
        public age: number) { }
}

// нам необходим сервис для взаимодействия с ним
// создадим src/app/user.service.ts

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user";
     
@Injectable()
export class UserService{
     
    private url = "http://localhost:3000/api/users";
    constructor(private http: HttpClient){ }
        
    getUsers(){
        return this.http.get<Array<User>>(this.url);
    }
    
    createUser(user: User){
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post<User>(this.url, JSON.stringify(user), {headers: myHeaders}); 
    }
    updateUser(user: User) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<User>(this.url, JSON.stringify(user), {headers:myHeaders});
    }
    deleteUser(id: string){
     
        return this.http.delete<User>(this.url + "/" + id);
    }
}


// добавим в папку src/app файл компонента app.component.ts

import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {NgTemplateOutlet} from "@angular/common";
import { FormsModule }   from "@angular/forms";
import { HttpClientModule }   from "@angular/common/http";
import {User} from "./user";
import {UserService} from "./user.service";
     
@Component({ 
    selector: "my-app", 
    standalone: true,
    imports: [FormsModule, HttpClientModule, NgTemplateOutlet],
    templateUrl: "./app.component.html",
    styles:`
    td, th {padding:3px;min-width:180px;max-width:200px;}
    input {width:100%}
    `,
    providers: [UserService]
}) 
export class AppComponent implements OnInit {
    //типы шаблонов
    // так как каждая строка грида может быть в двух состояниях в режиме редактирования и в режииме просмотра
    // определяем 2 переменные под это
    @ViewChild("readOnlyTemplate", {static: false}) readOnlyTemplate: TemplateRef<any>|undefined;
    @ViewChild("editTemplate", {static: false}) editTemplate: TemplateRef<any>|undefined;
        
    // для хранения редактируемого пользователя
    editedUser: User|null = null;
    // для хранения списка пользователей
    users: Array<User>;
    isNewRecord: boolean = false;
    statusMessage: string = "";
         
    constructor(private serv: UserService) {
        this.users = new Array<User>();
    }
        
    // происходит загрузка данных с помощью сервиса в список users
    ngOnInit() {
        this.loadUsers();
    }
         
    //загрузка пользователей
    private loadUsers() {
        this.serv.getUsers().subscribe((data: Array<User>) => {
                this.users = data; 
            });
    }
    // добавление пользователя
    addUser() {
        this.editedUser = new User("","",0);
        this.users.push(this.editedUser);
        this.isNewRecord = true;
    }
      
    // редактирование пользователя
    editUser(user: User) {
        this.editedUser = new User(user._id, user.name, user.age);
    }
    // загружаем один из двух шаблонов
    loadTemplate(user: User) {
        if (this.editedUser && this.editedUser._id === user._id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // сохраняем пользователя
    saveUser() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createUser(this.editedUser as User).subscribe(_ => {
                this.statusMessage = "Данные успешно добавлены",
                this.loadUsers();
            });
            this.isNewRecord = false;
            this.editedUser = null;
        } else {
            // изменяем пользователя
            this.serv.updateUser(this.editedUser as User).subscribe(_ => {
                this.statusMessage = "Данные успешно обновлены",
                this.loadUsers();
            });
            this.editedUser = null;
        }
    }
    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.users.pop();
            this.isNewRecord = false;
        }
        this.editedUser = null;
    }
    // удаление пользователя
    deleteUser(user: User) {
        this.serv.deleteUser(user._id).subscribe(_ => {
            this.statusMessage = "Данные успешно удалены",
            this.loadUsers();
        });
    }
}

// также добавим в проект src/app/app.component.html
// он будет представлять шаблон для компонента AppComponent


<h1>Список пользователей</h1>
<button (click)="addUser()">Добавить</button>
<table>
     
    <tr>
        <th>Id</th>
        <th>Имя</th>
        <th>Возраст</th>
        <th></th>
    </tr>
    // для каждого объекта из массива users создается строка с нужным шаблоном
    @for(user of users; track $index){
        <tr>
            // встраивается шаблон, эта директива привязана к методу loadTemplate
            // ngTemplateOutletContext для передачи контекстав шаблон, с помощью $implicit задается передаваемый объект - user
            <ng-template [ngTemplateOutlet]="loadTemplate(user)" [ngTemplateOutletContext]="{ $implicit: user}">
            </ng-template>
        </tr>
    }
</table>
<div>{{statusMessage}}</div>
     
     
<!--шаблон для чтения-->
<ng-template #readOnlyTemplate let-user>
    <td>{{user._id}}</td>
    <td>{{user.name}}</td>
    <td>{{user.age}}</td>
    <td>
        <button (click)="editUser(user)">Изменить</button> 
        <button (click)="deleteUser(user)">Удалить</button>
    </td>
</ng-template>
    
<!--шаблон для редактирования-->
<ng-template #editTemplate>
    <td>
        <input [(ngModel)]="editedUser._id" readonly disabled />
    </td>
    <td>
        <input [(ngModel)]="editedUser.name" />
    </td>
    <td>
        <input type="number" [(ngModel)]="editedUser.age" />
    </td>
    <td>
        <button (click)="saveUser()">Сохранить</button>
        <button (click)="cancel()">Отмена</button>
    </td>
</ng-template>

// также определим src/main.ts

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
bootstrapApplication(AppComponent);

// и src/index.html

<!DOCTYPE html>
<html>
    <head>
        <title>METANIT.COM</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <my-app>Загрузка...</my-app>
    </body>
</html>



// Создание серверной части

// для тестирования я определил приложееине на node.js 
// которое для хранения данных использует бд mongodb
// Для этого приложения создадим каталог и вначале определим 
// в нем файл package.json со следующим содержимым

{
  "name": "mongoapp",
  "version": "1.0.0",
  "dependencies": {
      "express": "~4.18.0",
      "mongodb": "~6.3.0"
    }
}

// То есть приложение на node.js будет использовать два пакета:
// express для упрощения создания API и mongodb для работы с базой данных MongoDB. 
// С помощью команды npm install установим эти пакеты

// далее опредим файл app.js который будет представлять node.js

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId;
     
const app = express();
const jsonParser = express.json();
   
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
 
(async () => {
     try {
        await mongoClient.connect();
        app.locals.collection = mongoClient.db("usersdb").collection("users");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }catch(err) {
        return console.log(err);
    } 
})();
  
  
// настройка CORS
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();  // передаем обработку запроса дальше
});
 
app.get("/api/users", async(req, res) => {
          
    const collection = req.app.locals.collection;
    try{
        const users = await collection.find({}).toArray();
        res.send(users);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
       
});
app.get("/api/users/:id", async(req, res) => {
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOne({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
     
app.post("/api/users", jsonParser, async(req, res)=> {
         
    if(!req.body) return res.sendStatus(400);
         
    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
         
    const collection = req.app.locals.collection;
      
    try{
        await collection.insertOne(user);
        res.send(user);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
      
app.delete("/api/users/:id", async(req, res)=>{
          
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.params.id);
        const user = await collection.findOneAndDelete({_id: id});
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
     
app.put("/api/users", jsonParser, async(req, res)=>{
          
    if(!req.body) return res.sendStatus(400);
    const userName = req.body.name;
    const userAge = req.body.age;
         
    const collection = req.app.locals.collection;
    try{
        const id = new objectId(req.body._id);
        const user = await collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
         {returnDocument: "after" });
 
        if(user) res.send(user);
        else res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});
   
// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", async() => {
      
    await mongoClient.close();
    console.log("Приложение завершило работу");
    process.exit();
});

// запустим сервер с помощью команды


