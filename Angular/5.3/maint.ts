// Состояние модели и валидация

// директива ngModel позволяет отслеживать состояние элемента ввода.
// для установки состояние применяется к элементам ввода спец классы CSS

// если элемент не получал фокус, то устанавливается ng-untouched
// если полученил фокус, устанавливается ng-touched
// если первоначальное значение в поле ввода было изменено, то устанавливается класс ng-dirty
// если же не менялось, то ng-pristine
// если значение корректно, то применяется ng-valid
// если нет, то ng-invalid

// например при запуске веб-страницы для элемента ввода:
<input class="form-control" name="username" [(ngModel)]="username" />

// будет генерироваться след. разметка 
<input class="form-control ng-untouched ng-pristine ng-valid" name="username" ng-reflect-name="username" />



// Валидация

// для проверки мы можем использовать валидацию HTML5
// required - обязательный ввод значения
// pattern - задаёт регулярное выражение которому должны соответствовать вводимые данные 


// Определим следующий компонент
import { Component} from "@angular/core";
import { FormsModule} from "@angular/forms";
 
class User{
    constructor(public name: string,
        public email: string,
        public phone: string){}
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    styles: `
        .alert{ color:red}
        div {margin: 5px 0;}
    `,
    template: `<div> 
                    <div>
                        <label>Имя</label><br>
                        <input name="name" [(ngModel)]="user.name" #name="ngModel" required />
                        <div [hidden]="name.valid || name.untouched" class="alert">
                          Не указано имя
                        </div>
                    </div>
                    <div>
                        <label>Email</label><br>
                        <input name="email" [(ngModel)]="user.email" #email="ngModel" 
                            required pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" />
                        <div [hidden]="email.valid || email.untouched" class="alert">
                          Некорректный email
                        </div>
                    </div>
                    <div>
                        <label>Телефон</label><br>
                        <input  name="phone" [(ngModel)]="user.phone" #phone="ngModel" 
                            required pattern="[0-9]{11}" />
                        <div [hidden]="phone.valid || phone.untouched" class="alert">
                          Некорректный телефон
                        </div>
                    </div>
                    <button (click)="addUser()">Добавить</button>
              </div>`
})
export class AppComponent { 
   
    user: User = new User("", "", "");
    addUser(){
        console.log(this.user);
    }
}

// при некорректно введённых данных мы можем использовать проверку для кнопке
// в зависимости от данных она будет блокироваться 

<button [disabled]="name.invalid || email.invalid || phone.invalid" 
    (click)="addUser()">Добавить</button>





// Стилизация ошибок валидации

// можем изменить стилизацию

import { Component} from "@angular/core";
import { FormsModule} from "@angular/forms";
 
class User{
    constructor(public name: string,
        public email: string,
        public phone: string){}
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    styles: `
        .alert{ color:red}
        div {margin: 5px 0;}    
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    template: `<div> 
                    <div>
                        <label>Имя</label><br>
                        <input name="name" [(ngModel)]="user.name" #name="ngModel" required />
                    </div>
                    <div>
                        <label>Email</label><br>
                        <input name="email" type="email" [(ngModel)]="user.email" #email="ngModel" 
                            required email />
                    </div>
                    <div>
                        <label>Телефон</label><br>w
                        <input  name="phone" [(ngModel)]="user.phone" #phone="ngModel" 
                            required pattern="[0-9]{11}" />
                    </div>
                    <button [disabled]="name.invalid || email.invalid || phone.invalid"
                        (click)="addUser()">Добавить</button>
              </div>`
})
export class AppComponent { 
   
    user: User = new User("", "", "");
    addUser(){
        console.log(this.user);
    }
}
// для валидации email применяется спец валидатор email `  type="email"  `