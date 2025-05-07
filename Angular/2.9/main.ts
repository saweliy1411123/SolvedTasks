// Жизненный цикл 

// 1) конструктор: сначала выполняется конструктор компонента
// 2) ngOnChanges: вызывается до метода ngOnInit() при начальной установке
// св-в, которые связаны механизмом привязки, также при любой их перестановке 
// или изменении их значений.
// Данный метод принимает в качестве паарметра объект класса SimpleChanges,
// который содержит предыдущие и текущие значения св-ва. Например, проверка изменений:


// ngOnChanges(changes: SimpleChanges) {
//     for (const inputName in changes) {
//       const inputValues = changes[inputName];
//       console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
//       console.log(`Current ${inputName} == ${inputValues.currentValue}`);
//       console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
//     }
//   }

// 3) ngOnInit: вызывается один раз после того, как Ангуляр инициализирует все входные св-ва компонентов их начальными значениями.
// Выполняется до инициализации шаблона компонента, то есть можно обновить состояние компонента в методе на основе его начальных входных данных.
// Метод применяется для комплексной инициализации компонента. Например выполнение загрузки данных с сервера или из других источников данных
// лучше производить сложную инициализацию через него, тк конструктор должен быть простым и не должен реализовывать сложные инициализации

// 4) ngDoCheck: вызывается при каждой проверке изменений св-в компонента сразу после методов ngOnChanges и ngOnInit

// 5) ngAfterContentInit: вызывается один раз после метода ngDoCheck() после того, как инициализированы все вложенные компоненты

// 6) ngAfterContentChecked: вызывается ангуляром при проверке изменений содержимого, которое добавляется в шаблон компонента.
// Вызывается после метода ngAfterContentInit() и после каждого последующего вызова метода ngDoCheck()

// 7) ngAfterViewInit: вызывается ангуляром после инициализации шаблона компонента, а также шаблона дочерних компонентов.
// Вызывается только один раз сразу после первого вызова метода ngAfterContentChecked()

// 8) ngAfterViewChecked: вызывается фреймворком Angular после проверки на изменения в шаблоне компонента, а также проверки шаблона дочерних компонентов. 
// Вызывается после первого вызова метода ngAfterViewInit() и после каждого последующего вызова ngAfterContentChecked()

// 9) ngOnDestroy: вызывается перед тем, как фреймворк Angular удалит компонент.
// можно освобождать те используемые ресурсы, которые не удаляются автоматически сборщиком мусора
// удалять подписки на события DOM элементов, останваливать таймер и тд



// 10) afterRender и afterNextRender позволяют выполнить код после рендеринга компонента. Код этих функций будет вызываться после того, как Angular завершит рендеринг всех компонентов на странице в DOM. 
// Эти функции относятся ко всему приложению в целом, а не к отдельным компонентам. Поэтому они перехватывают момент посое рендеринга всего приложения, всех его компонентов.



// Большая часть подобных методов определена в отдельном интерфейсеЮ который называется по имени метода без префикса "ng" 
// Например, метод ngOnInit определен в интерфейсе OnInit. Если мы хотим отслеживать этапы ЖЦ то мы должны применять соответствующие интерфейсы

import { Component, OnInit, OnDestroy } from "@angular/core";
      
@Component({
    selector: "my-app",
    standalone: true,
    template: `<p>Hello METANIT.COM</p>`
})
export class AppComponent implements OnInit, OnDestroy {
     
    constructor(){ console.log("constructor"); }
    ngOnInit() { console.log("onInit"); }
    ngOnDestroy() { console.log("onDestroy"); }
}


// Еще примеры для ngOnChanges
// пусть будет дочерний компонент ChildComponent

import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
       
@Component({
    selector: "child-comp",
    standalone: true,
    template: `<p>Привет {{name}}</p>`
})
export class ChildComponent implements OnInit, OnChanges { 
    @Input() name: string = "";
  
    constructor(){ console.log("constructor"); }
    ngOnInit() { console.log("onInit"); }
      
    ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      }
    }
}

// и пусть он используется в глвном компоненте AppComponent

import { Component, OnChanges, SimpleChanges} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChildComponent} from "./child.component";
      
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, ChildComponent],
    template: `<child-comp [name]="name"></child-comp>
                <input type="text" [(ngModel)]="name" />
                <input type="number" [(ngModel)]="age" />`
})
export class AppComponent implements OnChanges { 
    name ="Tom";
    age = 25;
    ngOnChanges(changes: SimpleChanges) {
      for (let propName in changes) {
        let chng = changes[propName];
        let cur  = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);
        console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      }
    }
}

// если мы запустим приложение, то сможем заметить, что при каждом изменении св-ва name в главном компоненте вызывается метод ngOnChanges
// в то же время age не будет отслеживаться, потому что метод вызывается при изменении входных св-в Input

// Реализация всех методов

import { Component, 
    Input, 
    OnInit,
    DoCheck,
    OnChanges,
   AfterContentInit, 
   AfterContentChecked, 
   AfterViewChecked, 
   AfterViewInit} from "@angular/core";
 
@Component({
selector: "child-comp",
standalone: true,
template: `<p>Привет {{name}}</p>`
})
export class ChildComponent implements OnInit,
    DoCheck,
    OnChanges,
   AfterContentInit, 
   AfterContentChecked, 
   AfterViewChecked, 
   AfterViewInit  { 
@Input() name: string = "";
count= 1;

ngOnInit() {
  
 this.log(`ngOnInit`);
}
ngOnChanges() {
  
 this.log(`OnChanges`);
}
ngDoCheck() {
  
 this.log(`ngDoCheck`);
}
ngAfterViewInit() {
  
 this.log(`ngAfterViewInit`);
}
ngAfterViewChecked() {
  
 this.log(`ngAfterViewChecked`);
}
ngAfterContentInit() {
  
 this.log(`ngAfterContentInit`);
}
ngAfterContentChecked() {
  
 this.log(`ngAfterContentChecked`);
}

private log(msg: string) {
   console.log(this.count + ". " + msg);
   this.count++;
}
}

// используем этот компонент в главном компоненте 

import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChildComponent} from "./child.component";
      
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, ChildComponent],
    template: `<child-comp [name]="name"></child-comp>
                <input type="text" [(ngModel)]="name" />`
})
export class AppComponent{ 
     name = "Tom";
}