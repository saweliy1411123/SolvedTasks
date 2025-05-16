// Создание своих pipes 

// классы pipes должны реализовать интерфейс PipeTransform

interface PipeTransform {
  // должен преобразовать входное значение   
  // можем передавать данные любых типов 
  transform(value: any, ...args: any[]): any
}

// нам надо выводить число в котором разделителем целой и дробной частью является запятая а не точка

// добавим в src/app/format.pipe.ts

import { Pipe, PipeTransform } from "@angular/core";
  

@Pipe({
    // название по которому он будет передаваться
    name: "format",
    standalone: true // для автономных компонентов
})
export class FormatPipe implements PipeTransform {
  transform(value: number, args?: any): string {
      
    return value.toString().replace(".", ",");
  }
}

// Применим FormatPipe

import { Component} from "@angular/core";
import { FormatPipe } from "./format.pipe";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormatPipe],
    template: `<div>Число до форматирования: {{x}}<br>Число после форматирования: {{x | format}}</div>`
})
export class AppComponent { 
  
    x: number = 15.45;
}

// Передача параметров

// добавим pipe, который будет создавать строку
// src/app/join.pipe.ts

import { Pipe, PipeTransform } from "@angular/core";
 
@Pipe({
      name: "join",
    standalone: true
})
export class JoinPipe implements PipeTransform {
  // первым параметром передаётся массив, второй начальный индекс, третий конечный индекс 
  transform(array: string[], start?: number|undefined, end?: number|undefined): any {
    let result = array;
    if(start){
        if(end){
            result = array.slice(start, end);
        }
        else{
            result = array.slice(start, result.length);
        }
    }
    return result.join(", ");
  }
}

// применим

import { Component} from "@angular/core";
import { JoinPipe } from "./join.pipe";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [JoinPipe],
    template: `<div>{{users | join}}</div>
               <div>{{users | join:1}}</div>
               <div>{{users | join:1:3}}</div>`
})
export class AppComponent { 
 
    users = ["Tom", "Alice", "Sam", "Kate", "Bob"];
}