// Pipes
// представляет спец. инструменты, которые позволяют форматировать отображаемые значения
// Например чтобы вывести определенную дату


import { Component} from "@angular/core";
import { DatePipe } from "@angular/common"; // импорт
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [DatePipe],    // импортируем DatePipe
    // здесь создается дата, дважды выводится 
    template: `<div>Без форматирования: {{myDate}}</div>
               <div>С форматированием: {{myDate | date}}</div>`
})
export class AppComponent { 
 
    myDate = new Date(1961, 3, 12);
}


// Встроенные pipes

// CurrencyPipe: форматирует валюту
// PercentPipe: форматирует проценты
// UpperCasePipe: переводит строку в верхний регистр
// LowerCasePipe: переводит строку в нижний регистр
// DatePipe: форматирует дату
// DecimalPipe: задает формат числа
// SlicePipe: обрезает строку



// При применении классов суффикс Pipe отбрасывается за исключением DecimalPipe - для его применения используется название "number"

import { Component} from "@angular/core";
import {UpperCasePipe, LowerCasePipe, PercentPipe, CurrencyPipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [UpperCasePipe, LowerCasePipe, PercentPipe, CurrencyPipe],
    template: `<div>{{welcome | uppercase}}</div>
               <div>{{welcome | lowercase}}</div>
               <div>{{persentage | percent}}</div>
               <div>{{persentage | currency}}</div>`
})
export class AppComponent { 
 
    welcome: string = "Hello World!";
    persentage: number = 0.14; 
}

// Параметры в pipes

// например SlicePipe может получать в качестве параметра, начальный и конечный индексы строки для обрезания

import { Component} from "@angular/core";
import {SlicePipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [SlicePipe],
    // параметры передаются через двоеточие
    template: `<div>{{welcome | slice:3}}</div>
               <div>{{welcome | slice:6:11}}</div>`
})
export class AppComponent { 
 
    welcome: string = "Hello World!";
}


// Форматирование дат
// DatePipe в качестве параметра может принимать шаблон даты

import { Component} from "@angular/core";
import {DatePipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [DatePipe],
    template: `<div>{{myDate | date:"dd/MM/yyyy"}}</div>`
})
export class AppComponent { 
    myDate = Date.now();
}


// Форматирование чисел
// DecimalPipe в качестве параметра принимает формат числа в виде шаблона 

// value - само выводимое число
// digitsInfo - строка в формате minIntegerDigits.minFractionDigits-maxFractionDigits,
// где 1 - минимальное кол-во цифр в целой части, 2 - минимальное кол-во в дробной части, 3 - максимальное кол-во в дробное части
// locale код применяемой культуры
{{ value | number [ : digitsInfo [ : locale ] ] }}


import { Component} from "@angular/core";
import { DecimalPipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [DecimalPipe],
    template: `<div>{{pi | number:"2.1-2"}}</div>
    <div>{{pi | number:"3.5-5"}}</div>`
})
export class AppComponent { 
 
    pi: number = 3.1415;
}


// Форматирование валюты 
// CurrencyPipe может принимать ряд параметров

// value - вывод суммы
// currencyCode - код валюты, согласно спецификации ISO 4217, если не указан то применяется USD
// display - указывает как отображать символ валюты 
// принимаемые значения у display 
  // code - отображает код валюты (USD)
  // symbol - отображает символ валюты $
  // symbol-narrow - несколько символов
  // string - произвольная строка
// digitsInfo - формат числа, который применятеся в DecimalPipe
// locale - код используемой локали
{{ value | currency [ : currencyCode [ : display [ : digitsInfo [ : locale ] ] ] ] }}


import { Component} from "@angular/core";
import { CurrencyPipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [CurrencyPipe],
    template: `
    <div>{{money | currency:"RUB":"code"}}</div>
    <div>{{money | currency:"RUB":"symbol-narrow"}}</div>
    <div>{{money | currency:"RUB":"symbol":"1.1-1"}}</div>
    <div>{{money | currency:"RUB":"symbol-narrow":"1.1-1"}}</div>
    <div>{{money | currency:"RUB":"тока седня по цене "}}</div>`
})
export class AppComponent { 
    money: number = 23.45;
}


// Цепочки pipes 

// Применение нескольких pipes
import { Component} from "@angular/core";
import { SlicePipe, UpperCasePipe } from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [SlicePipe, UpperCasePipe],
    template: `<div>{{message | slice:6:11 | uppercase}}</div>`
})
export class AppComponent { 
    message = "Hello World!";
}