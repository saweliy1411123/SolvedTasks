// Шаблонные переменные ViewChild

// они позволяют определить некоторые переменные внутри шаблона компонента 
// затем ссылаться к этим переменным их этого же шаблона

// для определения подобных переменных применяется знак #

// Определим шаблонную переменнную userName в компоненте 
import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    template: `
                <p #userName>{{name}}</p>
                <p>{{userName.textContent}}</p>
                <input type="text" [(ngModel)]="name" />`
})
export class AppComponent { 
    name = "Tom";
}
// определяя её, мы подразумеваем что она будет представлять "параграф" элемент p разметки html 
// мы можем обращаться к этому "Параграфу" через данную переменную 
// например через св-во userName.textContent, если привязанное к параграфу значение name изменинтся, 
// то соответственно изменится и значение userName.textContent
// данную переменную можно использовать только внутри шаблона



// Определим дочерний компонент ChildComponent

import { Component} from "@angular/core";
       
@Component({
    selector: "child-comp",
    standalone: true,
    template: `<p>{{counter}}</p>`
})
export class ChildComponent{
     
    counter  = 0;
    increment() { this.counter++; }
    decrement() { this.counter--; }
}


// код главного компонента

import { Component} from "@angular/core";
import { ChildComponent } from "./child.component";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<child-comp #counter></child-comp>
                <button (click)="counter.increment()">+</button>
                <button (click)="counter.decrement()">-</button>`
})
export class AppComponent { }

// мы не можем написать так, потому что ШП не могут применятся вне шаблона

export class AppComponent { 
 
    increment() { this.counter++; }
    decrement() { this.counter--; }
}



// Чтобы иметь возможность обращаться к методам и прочей ф-ности дочернего компонента, надо использовать декоратор ViewChild
// Данный декоратор применяется к св-ву и получает селектор элемента DOM, который необходимо отслеживать.
// И если этот элемент изменяется то ViewChild изменяет состояние св-ва

// изменим главный компонент следующим образом

import { Component, ViewChild } from "@angular/core";
import { ChildComponent} from "./child.component";
       
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<child-comp></child-comp>
                <button (click)="increment()">+</button>
                <button (click)="decrement()">-</button>`
})
export class AppComponent { 
    // Первый параметр указывает на селектор элемента, который будет отслеживаться, второй будет указывать как будет производиться отслеживание изменений
    @ViewChild(ChildComponent, {static: false})
    private counterComponent: ChildComponent|undefined;
      
    increment() { this.counterComponent?.increment(); }
    decrement() { this.counterComponent?.decrement(); }
}



// с помощью декоратора ViewChild можно связать св-во и переменную из шаблона

// код главного компонента
import { Component, ViewChild, ElementRef } from "@angular/core";
import { ChildComponent } from "./child.component";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<p #nameText>{{name}}</p>
               <p>{{nameText.textContent}}</p>
               <button (click)="change()">Изменить</button>`
})
export class AppComponent { 
  
    @ViewChild("nameText", {static: false})
    nameParagraph: ElementRef|undefined; // ElementRef используется для ссылки
      
    name = "Tom";
      
    change() {
        if(this.nameParagraph!==undefined){
            console.log(this.nameParagraph.nativeElement.textContent); 
            this.nameParagraph.nativeElement.textContent = "hell";
        }
    }
}



// Кроме ViewChild мы можем использовать ContentChild, который работает похожим образом

// код главного компонента

import { Component} from "@angular/core";
import { ChildComponent } from "./child.component";
 
// здест определена переменная #headerContent, которая указывает на элемент заголовка h3
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<child-comp>
                    <h3 #headerContent>Добро пожаловать {{name}}!</h3>
               </child-comp>`
})
export class AppComponent { 
 
    name = "Tom";
}

// для получения данных в дочернем компоненте будет использовать ng-content

import { Component, ContentChild, ElementRef } from "@angular/core";
       
@Component({
    selector: "child-comp",
    standalone: true,
    template: `<ng-content></ng-content>
               <button (click)="change()">Изменить</button>`
})
export class ChildComponent{ 
      
    @ContentChild("headerContent", {static:false})
    header: ElementRef|undefined;
      
    change() { 
        if(this.header !==undefined){
            console.log(this.header); 
            this.header.nativeElement.textContent = "Hell to world!"; 
        }
    }
}