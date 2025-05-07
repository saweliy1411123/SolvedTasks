// Вложенные компоненты 

// Они управляют каким-то участком разметки html. 
// Для каждого блока с определённой задачей, можно создать отдельный компонент,
// чтобы упростить управление блоками на странице.


// добавим в проект child.component.ts
// определим в нём такой код


// чтобы сделать класс компонентом, необходимо применить декоратор 
// @Component
// компонент будет управлять разметкой, которая будет вставляться в элемент child-comp
import { Component } from "@angular/core";
      
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<h2>ChildComponent Header</h2>`
})
export class ChildComponent {}


// Теперь определим в файле app.component.ts код главного компонента приложения - AppComponent

import { Component } from "@angular/core";
import {ChildComponent} from './child.component'; // обязательно надо импортировать
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent], // обязательно надо импортировать
    template: `<h1>AppComponent Header</h1>
        <child-comp></child-comp>`, // сюда будет вставляться код из child.component.ts, selector 'child-comp'
})
export class AppComponent {}

// в файле main.ts, загружается компонент AppComponent
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
bootstrapApplication(AppComponent);



// определим здесь код child.component.ts

import { Component } from "@angular/core";
      
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<h2>Hello from {{name}}!</h2>`,
    styles: [`h2{color:navy;}`]
})
export class ChildComponent { 
    name= "ChildComponent";
}

// теперь в файле app.component.ts 

import { Component } from "@angular/core";
import {ChildComponent} from './child.component';
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<h2>Hello from {{name}}</h2>
                <child-comp></child-comp>`,
    styles: ["h2 {color:black;}"]
})
export class AppComponent { 
    name = "AppComponent";
}

// если запустим проект, увидим, что к одному стиль применяется, а к другому нет
// существуют независимо 


// ng-content позволяет внедрять родительским компонентам внедрять код html в дочерние компоненты
// вместо ng-content, можно будет передать любое содержимое
import { Component } from "@angular/core";
       
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<ng-content></ng-content>
            <p>Hello from {{name}}!</p>`,
    styles: [`h2 {color:navy;}`]
})
export class ChildComponent { 
    name= "ChildComponent";
}

// Изменим код главного компонента AppComponent

// то есть Hello from ... будет передаваться из child-comp в ng-content
// причем AppComponent задает стили и выражения привязки, вообщем будет управлять ng-content
import { Component } from "@angular/core";
import {ChildComponent} from './child.component';
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<child-comp><h2>Hello from {{name}}</h2></child-comp>`,
    styles: ["h2 {color:black;}"]
})
export class AppComponent { 
    name = "AppComponent";
}

