// Директивы 

// определяют набор инструкций, которые применяются при рендеринге html-кода.
// Представляет собой класс с директивными метаданными
// в TS для прикрепления метаданных к классу применяется декоратор @Directive

// в Ангуляр есть три типа директив 

// Компоненты: типо директива, @Component расширяет возможности декоратора @Directive с помощью добалвения ф-нала по работе с шаблонами
// Атрибутивные: изменяют поведение существующего элемента, к которому применяются. Например, ngModel, ngStyle, ngClass
// Структурные: изменяют структуру DOM с помощью добавления, изменения или удаляния элементов html. Например ngFor или ngIf

// ngClass 

// позволяет определить набор классов, которые будут применяться к элементу, в качестве значения принимает набор классов:
[ngClass]={
    "класс1": true/false,
    "класс2": true/false,
    ...................
}
// чтобы использовать нужно импортировать класс NgClass из модуля @angular/common
// Определим компонент
import { Component} from "@angular/core";
import {NgClass} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgClass],
    // можно переопределять унаследованные стили
    template: `<div [ngClass]="{verdanaFont:true}">
                    <h1>Hello Angular</h1>
                    <p [ngClass]="{segoePrintFont:true}">
                        Приложение Angular состоит из компонентов
                    </p>
                </div>`,
    styles: [
        `.verdanaFont{font-size:13px; font-family:Verdana;}
        .segoePrintFont{font-size:14px; font-family:"Segoe Print";}`
    ]
})
export class AppComponent { }
// можно привязку к выражениям использовать
{
    styles: [
        `.verdanaFont{font-size:13px; font-family:Verdana;}
        .segoePrintFont{font-size:14px; font-family:"Segoe Print";}`
    ] 
}

export class AppComponent { 
isVerdana = true;
isSegoe = true;
}
// в качестве альтернативы можем использовать 
<div [class.verdanaFont]="true">
    <h1>Hello Angular</h1>
    <p [class.verdanaFont]="false" [class.segoePrintFont]="true">
        Приложение Angular состоит из компонентов
    </p>
</div>

// также с помощью ngClass мы можем задать целый набор классов, которые применяются к элементу


@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgClass],
    template: `<div [ngClass]="currentClasses">
                    <h1>Hello Angular</h1>
                    <p>
                        Приложение Angular состоит из компонентов
                    </p>
                </div>`,
    styles: [
        `.verdanaFont{font-size:13px; font-family:Verdana;}
        .navyColor{color:navy;}`
    ]
})
export class AppComponent { 
     
    isVerdana = true;
    isNavy = true;
 
    currentClasses={
        verdanaFont: this.isVerdana,
        navyColor: this.isNavy
    }
}



// ngStyle 
// директива позволяет задать набор стилей которые применяются к элементу
// в качестве значения директива принимает js-объект, в котором ключи - названия св-в CSS

import { Component} from "@angular/core";
import {NgStyle} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgStyle],
    template: `<div [ngstyle]="{'font-size':'13px', 'font-family':'Verdana'}">
                    <h1>Hello Angular 19</h1>
                    <p [ngstyle]="{'font-size':'14px', 'font-family':'Segoe Print'}">
                        Приложение Angular состоит из компонентов
                    </p>
                </div>`
})
export class AppComponent { }

// аналогично можно использовать 
<div [style.fontSize]="'13px'" [style.fontFamily]="'Verdana'">
    <h1>Hello Angular 19</h1>
    <p [style.fontSize]="'14px'" [style.fontFamily]="'Segoe Print'">
        Приложение Angular состоит из компонентов
    </p>
</div>


// Динамическое изменение стилей 


import { Component} from "@angular/core";
import {NgClass} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgClass],
    template: `<div [ngClass]="{invisible: visibility}">
                    <h1>Hello Angular 19</h1>
                    <p>
                        Приложение Angular состоит из компонентов
                    </p>
                </div>
                <button (click)="toggle()">Toggle</button>`,
    styles: [ `.invisible{display:none;}`]
})
export class AppComponent { 
     
    visibility: boolean = true;
    // переключаем переменную
    toggle(){
        this.visibility=!this.visibility;
    }
}

// в качестве альтернативы можно использовать 
<div [class.invisible]="visibility">
// либо
<div [style.display]="visibility?'block':'none'">