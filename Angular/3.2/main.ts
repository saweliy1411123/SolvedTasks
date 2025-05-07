// Создание атрибутивных директив

// директива ngClass позволяет установить для элемента класс CSS
// при этом директива применяется в качестве атрибута
<div [ngClass]="{verdanaFont:true}">

// мы можем сами создавать свои директивы атрибутов 
// в src/app создадим bold.directive.ts
// определим в нём следующий код 

import {Directive, ElementRef} from "@angular/core";
 

// необходимо применить селектор CSS, с которым будет ассоциирована директива 

@Directive({
    selector: "[bold]",
    standalone: true // позволит импортировать в другие автономные компоненты
})
export class BoldDirective{
     
    constructor(private elementRef: ElementRef){
         
        this.elementRef.nativeElement.style.fontWeight = "bold";
    }
}

// код главного, с применением директивы 

import { Component} from "@angular/core";
import { BoldDirective} from "./bold.directive"; // для того чтобы заработало, нужно импортировать
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [BoldDirective],
    template: `<div>
                  <p bold>Hello Angular</p>
                  <p>Приложение Angular состоит из компонентов</p>
               </div>`
})
export class AppComponent {}


// для управления стилем удобнее использовать рендерер
import {Directive, ElementRef, Renderer2} from "@angular/core";
 
@Directive({
    selector: "[bold]",
    standalone: true
})
export class BoldDirective{
    //  Rendere2 представляет сервис, который также при вызове директивы автоматически передается в её конструктор
    // мы можем использовать данный сервис для стилизации элемента, результат будет тот же 
    constructor(private elementRef: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", "bold");
    }
}