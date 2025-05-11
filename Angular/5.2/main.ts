// Получение и изменение модели

// кроме создания привязки директива ngModel позволяет определить объект NgModel, который 
// будет связан с определённым элементом ввода

// например вот такой компонент

import { Component} from "@angular/core";
import { FormsModule,  NgModel } from "@angular/forms";
 
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
    // каждая переменная представляет модель и её состояние для соответствующего поля ввода
    // используя св-ва объекта NgModel, мы можем получить данные о состоянии модели
    // в частности с помощью св-ва name мы можем получить название поля ввода. 
    template: `<div> 
                    <p>
                        <label>Имя пользователя</label><br>
                        <input name="name" [(ngModel)]="user.name" #userName="ngModel"/>
                    </p>
                    <p>
                        <label>Возраст</label><br>
                        <input type="number" name="age" [(ngModel)]="user.age" #userAge="ngModel"/>
                    </p>
                    <p>
                        <label>Место работы</label><br>
                        <select name="company" [(ngModel)]="user.company" #userCompany="ngModel">
                        @for(comp of companies; track $index){
                            <option [value]="comp">
                                {{comp}}
                            </option>
                        }
                        </select>
                    </p>
                    <button (click)="logUser(userName, userAge, userCompany)">Логгировать</button>
                </div>
                <div>
                // А с помощью model и viewModel можно получить модель или конкретное значение этого поля.
                    <p>{{userName.name}} : {{userName.model}}</p>
                    <p>{{userAge.name}} : {{userAge.model}}</p>
                    <p>{{userCompany.name}} : {{userCompany.model}}</p>
                </div>`
})
export class AppComponent { 
  
    user = new User("", 18, "")
      
    users: User[] = [];
    companies: string[] = ["Apple", "Microsoft", "Google", "Jetbrains"];
      
    logUser(name: NgModel, age: NgModel, company: NgModel){
        console.log(name);
        console.log(age);
        console.log(company);
    }
}


// Обработка изменения модели

// Иногда необходимо проконтролировать изменение модели. 
// для этого мы можем обрабатывать встроенные события 

// событие change
<input name="name" [(ngModel)]="user.name" 
            #userName="ngModel" (change)="onNameChange()" />

// будет вызываться событие onNameChange(), определим его в классе компонента
onNameChange(){
    if(this.user.name=="admin")
        this.user.name = "Undefined";
}            

// но это работает только, когда мы покидаем поле ввода
// для динамической проверки лучше подойдёт ngModelChange

<input name="name" [(ngModel)]="user.name" 
            #userName="ngModel" (ngModelChange)="onNameChange()" />

