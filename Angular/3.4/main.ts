// Получение параметров в директивах 

// директива может получать входные параметры извне
// для этого используется декоратор Input 
// возьмем директиву BoldDirective, мы хотим чтобы при наведении менялась высота шрифта,
// но нужную высоту задать извне директивы 



import {Directive, HostListener, Input, HostBinding} from "@angular/core";
 
@Directive({
    selector: "[bold]",
    standalone: true,
})
export class BoldDirective{
    // в данном случае определяются два входных параметра 
    @Input() selectedSize = "18px";
    @Input() defaultSize = "16px";
      
    private fontSize : string;
    private fontWeight = "normal";
    constructor(){
        this.fontSize = this.defaultSize;
    }
     
    @HostBinding("style.fontSize") get getFontSize(){
         
        return this.fontSize;
    }
     
    @HostBinding("style.fontWeight") get getFontWeight(){
         
        return this.fontWeight;
    }
     
    @HostBinding("style.cursor") get getCursor(){
        return "pointer";
    }
     
    @HostListener("mouseenter") onMouseEnter() {
        this.fontWeight ="bold";
        this.fontSize = this.selectedSize;
    }
 
    @HostListener("mouseleave") onMouseLeave() {
        this.fontWeight = "normal";
        this.fontSize = this.defaultSize;
    }
}


// задействуем эти параметры

import { Component} from "@angular/core";
import { BoldDirective} from "./bold.directive";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [BoldDirective],
    // при применении директивы мы можем указать все входные параметры и значения
    template: `<div>
                  <p bold selectedSize="28px" [defaultSize]="'14px'">Hello Angular</p>
                  <p>Приложение Angular состоит из компонентов</p>
               </div>`
})
export class AppComponent {}

// обозначить можно по разному
// [defaultSize]="'14px'" либо  selectedSize="28px"


// изменим первый входной параметр 
@Input("bold") selectedSize = "18px";

// теперь чтобы установить этот параметр, можем использовать имя директивы 

<p [bold]="'28px'" [defaultSize]="'14px'">Hello Angular</p>



