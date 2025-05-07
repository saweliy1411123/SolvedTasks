// для Angular 17 и выше, было добавление во фреймворк синтаксических конструкций


// Конструкция if
import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    template:`<div>
      <input [(ngModel)]="num" type="number" />
      @if(num==5){
        <p>Переменная num равна 5</p>
      }
    </div>`
})
export class AppComponent {
    num = 5;
}

// ещё Пример


import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    template:`<div>
      <input [(ngModel)]="num" type="number" />
      @if(num==5){
        <p>Переменная num равна 5</p>
      } @else if(num==6){
        <p>Переменная num равна 6</p>
      } @else {
        <p>У переменной num неизвестное значение</p>
      }
    </div>`
})
export class AppComponent {
    num = 5;
}


// если эе надо вывести значение переменной, то оно заключается в двойные фигурные скобки
import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    template:`<div>
      <input [(ngModel)]="age" min="1" type="number" />
      <h2>@if(age>0 && age < 110){
        Your age is {{age}}
      } @else {
        age is undefined
      }</h2>
    </div>`
})
export class AppComponent {
    age: number|undefined = undefined;
}


// также есть использование switch 

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    template:`<input [(ngModel)]="op" />
    <p>a = {{a}}  b = {{b}}</p>
  <p>Результат: 
      @switch (op) {
        @case ("+") {
          {{ a + b }}
        }
        @case ("-") {
          {{ a - b }}
        }
        @case ("*") {
          {{ a * b }}
        }
        @default {
          Неизвестная операция
        }
      }
    </p>`
})
export class AppComponent {
    op = "-"; // символ операции  
    a = 10;
    b = 5;
}


// циклы и конструкция for 


import { Component} from "@angular/core";
 
// track item при уникальных именах
// track $index при неуникальных
@Component({
    selector: "my-app",
    standalone: true,
    template:`<ul>
    @for (item of items; track item) {
          <li>{{ item }}</li>
    }
</ul>`
})
export class AppComponent {
    items = ["Tom", "Bob", "Sam"];
}

// Кроме $index внутри цикла мы можем применять еще ряд специальных значений:

// $count: количество элементов коллекции

// $first: является ли текущий элемент первым в коллекции

// $last: является ли текущий элемент последним в коллекции

// $even: является ли индекс текущего элемента четным

// $odd: является ли индекс текущего элемента нечетным



// Применение некоторых
@for (item of items; track $index) {
    <li>Item #{{ $index }}: {{ item }} {{$last?"(последний)":""}} {{$first?"(пeрвый)":""}}</li>
}



// Если применяются объекты у которых уникальность является одним из свойств
// то можно его указать через точку
import { Component} from "@angular/core";
 
class Item{
  constructor(public id: number, public name: string){}
}
 
@Component({
    selector: "my-app",
    standalone: true,
    template:`<ul>
   @for (item of items; track item.id) {
      <li>{{ item.name }}</li>
  }
</ul>`
})
export class AppComponent {
    items = [new Item(1, "Tom"), new Item(2, "Bob"), new Item(3,"Sam")];
}