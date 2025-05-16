// Pure и Impure Pipes 

// pure - не допускающие изменений

// Impure - допускающие изменения
// отслеживаются изменения когда меняется ссылка, а не значение


// если добавили значение но ссылка переменной не изменилась то подобное изменение не отслеживают


// по умолчанию это pure pipe
// значит что он может отслеживать изменния значения, которое ему передаётся так как оно представляет тип number
import { Pipe, PipeTransform } from "@angular/core";
   
@Pipe({
    name: "format",
    standalone: true
})
export class FormatPipe implements PipeTransform {
  transform(value: number, args?: any): string {
       
    return value.toString().replace(".", ",");
  }
}


// в компоненте мы могли бы динамически изменять значение, для которого выполняется форматирование
import { Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { FormatPipe } from "./format.pipe";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, FormatPipe],
    template: `<input [(ngModel)]="num" name="fact">
    <div>Результат: {{num | format}}</div>`
})
export class AppComponent { 
  
    num: number = 15.45;
}

// в прошлой теме был создан другой pipe
// сделаем его impure pipe
// для этого добавим декоратор pure: false

import { Pipe, PipeTransform } from "@angular/core";
 
@Pipe({
    name: "join",
  standalone: true,
    pure: false
})
export class JoinPipe implements PipeTransform {
  transform(array: string[], start?: any, end?: any): string {
      return array.join(", ");
  }
}

// теперь мы можем дбоавлять в компоненте новые элементы в этот массив

import { Component} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { JoinPipe } from "./join.pipe";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, JoinPipe],
    template: `<input #user name="user">
               <button (click)="users.push(user.value)">Add</button>
               <p>{{users | join}}</p>`
})
export class AppComponent { 
  
    users = ["Tom", "Alice", "Sam", "Kate", "Bob"];
}