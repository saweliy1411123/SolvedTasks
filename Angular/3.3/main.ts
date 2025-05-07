// Взаимодействие с пользователем, HostListener и HostBinding

// Атрибутивная директива может взаимодейстовавать с пользователем
// для этого применяется декоратор HostListener

// пусть в src/app в файле bold.directive.ts определена директива BoldDirective

// с таким кодом

import {Directive, ElementRef, Renderer2, HostListener} from "@angular/core";
 
@Directive({
    selector: "[bold]",
    standalone: true
})
export class BoldDirective{
     
    constructor(private element: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }
    // декортатор @HostListener позволяет связать события DOM и методы директивы
    @HostListener("mouseenter") onMouseEnter() {
        this.setFontWeight("bold");
    }
 
    @HostListener("mouseleave") onMouseLeave() {
        this.setFontWeight("normal");
    }
 
    private setFontWeight(val: string) {
        this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
    }
}

// код компонента остаётся тем же 

import { Component} from "@angular/core";
import { BoldDirective} from "./bold.directive";
 
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

// HostBinding 
// позволяет связать обычное св-во класса со св-влм элемента, к которому применяется директива 

import {Directive, HostListener, HostBinding} from "@angular/core";
 
@Directive({
    selector: "[bold]",
    standalone: true
})
export class BoldDirective{
     
    private fontWeight = "normal";
     
    // style.fontWeight связывается с getFontWeight, который возвращает this.fontWeight
    @HostBinding("style.fontWeight") get getFontWeight(){
         
        return this.fontWeight;
    }
     
    @HostBinding("style.cursor") get getCursor(){
        return "pointer";
    }
     
    @HostListener("mouseenter") onMouseEnter() {
        this.fontWeight ="bold";
    }
 
    @HostListener("mouseleave") onMouseLeave() {
        this.fontWeight = "normal";
    }
}


// Свойство host 

// вместо HostListener и HostBinding для реагирования директивы на действия пользователя
// мы можем определить обработчики событий в декораторе Directive с помощью св-ва Host


// всё аналогично, только теперь все события связанные с ними обработчики определяются с помощью параметра host
import {Directive, ElementRef, Renderer2} from "@angular/core";
  
@Directive({
    selector: "[bold]",
    standalone: true,
    host: {
        "(mouseenter)": "onMouseEnter()",
        "(mouseleave)": "onMouseLeave()"
    }
})
export class BoldDirective{
      
    constructor(private element: ElementRef, private renderer: Renderer2){
          
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }
     
    onMouseEnter(){
        this.setFontWeight("bold");
    }
    onMouseLeave(){
        this.setFontWeight("normal");
    }
    private setFontWeight(val: string) {
        this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
    }
}