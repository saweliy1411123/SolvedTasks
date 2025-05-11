// Работа с формами
// Модуль FormsModule и директива NgModel


// в веб приложениях используются формы, для этого импортируют модуль FormsModule
// прежде чем использовать формы в главном модуле AppModule надо его импортировать 

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule], // для работы с формами импортируем FormsModule
    template: ``
})
export class AppComponent{ }


// кроме того в файле конфигурации приложения package.json среди списка используемых зависимостей
// должен быть указан пакет angular/forms

{
    "name": "helloapp",
    "version": "1.0.0",
    "description": "First Angular 19 Project",
    "author": "Kataev Saveliy",
    "scripts": {
        // команды angular cli
    },
    "dependencies": {
        "@angular/forms": "~19.0.0",
        // остальные пакеты
    },
    "devDependencies": {
         
        // остальные пакеты
    }
}

// при работе с формами используется директива NgModel
// она создает объект FormControl и привязывает эту модель к созданному элементу формы
// Объект FormControl отслеживает значение модели, а также отвечает за валидацию этого значения 
// и взаимодействие с пользователем 
// данная директива принимает переданную модель как входное св-во, мы можем использовать одно-двунаправленнную привязку

// если нам надо вывести значение модели в поле ввода можно использовать однонаправленной привязкой
// это обычная привязка св-ва, где в качестве модели используется некоторое св-во tittle, определённое в классе компонента
<input name="title" [ngModel]="title" />


// если нам надо отслеживать изменение введённых данных, то мы можем использовать двунаправленную привязку
<input name="title" [(ngModel)]="title" />



// Пример
// в файле app.component.ts следующий код


import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
class User{
    constructor(public name: string, 
                public age: number, 
                public company: string)
    { }
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule], // для работы с формами импортируем FormsModule
    template: `<div> 
                    <p>
                        <label>Имя пользователя</label><br>
                        <input name="name" [(ngModel)]="name" />
                    </p>
                    <p>
                        <label>Возраст</label><br>
                        <input type="number" name="age" [(ngModel)]="age" />
                    </p>
                    <p>
                        <label>Место работы</label><br>
                        <select name="company" [(ngModel)]="company">
                        @for(comp of companies; track $index){
                            <option [value]="comp">
                                {{comp}}
                            </option>
                        }
                        </select>
                    </p>
                    <button (click)="addUser()">Добавить</button>
              </div>
              <div>
                <h3>Добавленные элементы</h3>
                <ul>
                @for(u of users; track $index){
                    <li>{{u.name}} ({{u.company}}) - {{u.age}}</li>
                }
                </ul>
              </div>`
})
export class AppComponent { 
  
    name: string = "";
    age: number = 18;
    company: string = "";
      
    users: User[] = [];
    companies: string[] = ["Apple", "Microsoft", "Google", "Jetbrains"];
      
    addUser(){
        this.users.push(new User(this.name, this.age, this.company));
    }
}



// мы можем пойти дальше и определить для формы ввода отдельную модель, которая будет инкапсулировать эти значения

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
class User{
    constructor(public name: string, 
                public age: number, 
                public company: string)
    { }
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule], // для работы с формами импортируем FormsModule
    template: `<div> 
                    <p>
                        <label>Имя пользователя</label><br>
                        <input name="name" [(ngModel)]="newUser.name" />
                    </p>
                    <p>
                        <label>Возраст</label><br>
                        <input type="number" name="age" [(ngModel)]="newUser.age" />
                    </p>
                    <p>
                        <label>Место работы</label><br>
                        <select name="company" [(ngModel)]="newUser.company">
                        @for(comp of companies; track $index){
                            <option [value]="comp">
                                {{comp}}
                            </option>
                        }
                        </select>
                    </p>
                    <button (click)="addUser()">Добавить</button>
              </div>
              <div>
                <h3>Добавленные элементы</h3>
                <ul>
                @for(u of users; track $index){
                    <li>{{u.name}} ({{u.company}}) - {{u.age}}</li>
                }
                </ul>
              </div>`
})
export class AppComponent { 
  
    newUser = new User("", 18, "Google")
      
    users: User[] = [];
    companies: string[] = ["Apple", "Microsoft", "Google", "Jetbrains"];
      
    addUser(){
        this.users.push({...this.newUser});
    }
}