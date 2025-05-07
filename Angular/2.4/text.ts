// Ангуляр поддерживает механизм привязки, различные части шаблона могут быть привязаны
// к некоторым значениямЮ определенным в компоненте

// в ангуляр есть следующие формы привязки данных
// DOM (односторонняя)

<h1>Добро пожаловать {{name}}!</h1>

// привязка свойства DOM (односторонняя)

<input type="text" [value]="name" />

// привязка метода компонента к событию в DOM
// (генерация события в DOM, вызывает метод на компоненте) (одностороняя)

<button (click)="addItem(text, price)">Добавить</button>

// двусторонняя привязка, когда элемент DOM привязан к значению на компоненте, при этом изменения 
// на одном конце привязки сразу приводят к изменениям на другом конце.

<input [(ngModel)]="name" placeholder="name">

// также присутствуют:
   // привязка к атрибуту элемента html
   // привязка к классу css
   // привязка к стилю элемента html



// Интерполяция

// при запуске, значения name и age будут автоматически заполнятся
import { Component } from "@angular/core";
      
@Component({
    selector: "my-app",
    standalone: true,
    template: `<p>Имя: {{name}}</p>
                <p>Возраст: {{age}}</p>`
})
export class AppComponent { 
    name = "Tom";
    age = 25;
}


// привязка свойств элементов html 

// мы можем привязать значение к свойству элемента html 
// указываем в квадратных скобках


// мы передаем значение с помощью интерполяции атрибуту элемента
import { Component } from "@angular/core";
      
@Component({
    selector: "my-app",
    standalone: true,
    template: `<input type="text" [value]="name" />`
    // template: `<input type="text" value="{{name}}" />`
})
export class AppComponent { 
    name = "Tom";
}

// у html нет атрибута textContent, но у Node есть св-во, и мы можем осуществить привязку
// template: `<p [textContent]="name"></p>`



// Привязка к атрибуту 
// так как соответствие свойства и атрибута бывает не всегда как в примере выше
// надо использовать выражение 

// [attr.название_атрибута]="значение"

import { Component } from "@angular/core";
      
@Component({
    selector: "my-app",
    standalone: true,
    template: `<input [attr.value]="text" />`
})
export class AppComponent{ 
       
    text="Hello Metanit.com";
}


// Привязка к событию
// позволяет связать с событием элемента метод из компонента
import { Component } from "@angular/core";
      
@Component({
    selector: "my-app",
    standalone: true,
    template: `<p>Количество кликов {{count}}</p>
                <button (click)="increase()">Click</button>`
                // <button on-click="increase()">Click</button>`
})
export class AppComponent { 
    count: number=0;
    increase() : void {
        this.count++;
    }
}


// мы можем передавать информаию о событии через объект $event:

import { Component } from "@angular/core";
       
@Component({
    selector: "my-app",
    standalone: true,
    template: `<p>Количество кликов {{count}}</p>
                <button (click)="increase($event)">Click</button>`
})
export class AppComponent { 
    count: number=0;
    increase($event : any) : void {
        this.count++;
        console.log($event);
    }
}


// Двустороняя привязка 
// позволяет динамически менять значния на одном конце привязки 
// при изменениях на другом конце. Обычно применяется при input


import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
      
@Component({
    selector: "my-app",
    standalone: true,
    imports:[FormsModule],   // импортируем FormsModule для двусторонней привязки
    template: `<p>Привет {{name}}</p>
                <input type="text" [(ngModel)]="name" /> <br><br>
                <input type="text" [(ngModel)]="name" />`
})
export class AppComponent { 
    name ="Tom";
}


// Привязка к классам CSS
// имеет следующую форму

// указывается имя класса, которое мы хотим добавить или удалить
[class.имя_класса]="true/false"

// Пример
import { Component} from "@angular/core";
import { FormsModule} from '@angular/forms';
        
@Component({
    selector: "my-app",
    standalone: true,
    imports:[FormsModule],
    template: `<div [class.redbox]="isRed"></div>
            <div [class.redbox]="!isRed"></div>
            <input type="checkbox" [(ngModel)]="isRed" />`,
    styles: [`
        div {width:50px; height:50px; border:1px solid #ccc}
         .redbox{background-color:red;}
    `]
})
export class AppComponent{ 
      
    isRed = false;
}


// мы можем использовать привязку свойств для установки класса

import { Component} from "@angular/core";
        
@Component({
    selector: "my-app",
    standalone: true,
    template: `<div [class]="red"></div>`,
    styles: [`
        div {width:50px; height:50px; border:1px solid #ccc}
         .redbox{background-color:red;}
    `]
})
export class AppComponent{ 
      
    red = "redbox"
}



// Привязка стилей
// синтаксис такой
// [style.стилевое_свойство]="выражение ? A : B"

// Пример

import { Component} from "@angular/core";
import { FormsModule} from '@angular/forms';
        
@Component({
    selector: "my-app",
    standalone: true,
    imports:[FormsModule],
    template: `<div [style.backgroundColor]="isRed? 'red' : 'green'"></div>
    <div [style.background-color]="!isRed ? 'red' : 'green'"></div>
    <input type="checkbox" [(ngModel)]="isRed" />`,
    styles: [`
        div {width:50px; height:50px; border:1px solid #ccc}
    `]
})
export class AppComponent{ 
      
    isRed = false;
}