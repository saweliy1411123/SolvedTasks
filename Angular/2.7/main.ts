// Передача данных в дочерний компонент

// Что если мы хотим свойства дочернего компонента привязать к св-вам из главного
// Определим дочерний

import { Input, Component} from "@angular/core"; // импортируем input
      
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<p>Имя пользователя: {{userName}}</p>
              <p>Возраст пользователя: {{userAge}}</p>`
})

// особенностью таких входных свойств является то, что они могут устанавливаться извне
export class ChildComponent{ 
    @Input() userName: string = ""; 
    @Input() userAge: number = 0;
}

// код главного компонента

import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import {ChildComponent} from './child.component';
      
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent, FormsModule],
    // св-во userName определено в дочернем компоненте, как входное с input, то в главном можем использовать как атрибут, и можем применить привязку св-в
    template: `<child-comp [userName]="name" [userAge]="age"></child-comp>
                <input type="text" [(ngModel)]="name" />`
})
export class AppComponent { 
    name = "Tom";
    age = 24;
}


// Привязка к сеттеру дочернего компонента
// может быть необходимо когда в дочернем компоненте надо осуществить проверку или модиф. значения
// получаемого от главного компонента


// Пусть в главном компоненте устанавливается возраст пользователя
import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import {ChildComponent} from './child.component';
       
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent, FormsModule],
    template: `<child-comp [userName]="name" [userAge]="age"></child-comp>
                <input type="number" [(ngModel)]="age" />`
})
export class AppComponent { 
    name = "Tom";
    age = 24;
}

// а в дочернем будем получать переданный возраст через сеттер

import { Input, Component} from "@angular/core";
       
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<p>Имя пользователя: {{userName}}</p>
              <p>Возраст пользователя: {{userAge}}</p>`
})
export class ChildComponent{ 
    @Input() userName: string = "";
     _userAge: number = 0;
      
    @Input()
    set userAge(age:number) {
        if(age<0)
            this._userAge=0;
        else if(age>100)
            this._userAge=100;
        else
            this._userAge = age;
  }
  get userAge() { return this._userAge; }
}