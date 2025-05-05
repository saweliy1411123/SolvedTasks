import { Component } from "@angular/core";
import {FormsModule} from "@angular/forms";
     
@Component({
    selector: "my-app", // в этот элемент будет загружаться приложение angular 
    standalone: true, // компонент будет независимым
    imports: [FormsModule], // импортирует другие модули (данный модуль - поле ввода)
    // шаблон того, что увидим в браузере
    template: `<label>Введите имя:</label> 
                 <input [(ngModel)]="name" placeholder="name">
                 <h1>Добро пожаловать {{name}}!</h1>`
})
// экспорт класса компонента, в котором определяется name
export class AppComponent { 
    name= "";
}