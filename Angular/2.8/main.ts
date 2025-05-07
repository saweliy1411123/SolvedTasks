// Привязка к событиям дочернего компонента


// Определим дочерний компонент
import { Component, EventEmitter, Input, Output} from "@angular/core";
       
@Component({
    selector: 'child-comp',
    standalone: true,
    template: `<button (click)="change(true)">+</button>
               <button (click)="change(false)">-</button>`
})


// для передачи родительскому компоненту используем св-во 
// EventEmitter
export class ChildComponent{ 
    //  onChanged должно быть выходным поэтому @Output
    @Output() onChanged = new EventEmitter<boolean>();
    change(increased:boolean) {
        this.onChanged.emit(increased);
    }
}


// код главного компонента

import { Component } from "@angular/core";
import { ChildComponent } from './child.component';

// привязываем onChanged к событию onChanged(), где $event передаёт данные из дочернего компонента
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<h2>Количество кликов: {{clicks}}</h2>
              <child-comp (onChanged)="onChanged($event)"></child-comp>`
})
export class AppComponent { 
     
    clicks  = 0;
    onChanged(increased:boolean){
        increased?this.clicks++:this.clicks--;
    }
}

// Двусторонняя привязка 

// дочерний компонент

import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormsModule } from '@angular/forms';
       
@Component({
    selector: 'child-comp',
    standalone: true,
    imports: [FormsModule],
    template: `<input [ngModel]="userName" (ngModelChange)="onNameChange($event)" />`
})
export class ChildComponent{ 
     
    @Input() userName:string = "";
    @Output() userNameChange = new EventEmitter<string>();
    onNameChange(model: string){
         
        this.userName = model;
        // отправляет событие главному компоненту с помощью emit
        this.userNameChange.emit(model); 
    }
}


// главный компонент

import { Component} from "@angular/core";
import { ChildComponent} from './child.component';
       
@Component({
    selector: "my-app",
    standalone: true,
    imports: [ChildComponent],
    template: `<child-comp [(userName)]="name"></child-comp>
                <div>Выбранное имя: {{name}}</div>`
})
export class AppComponent { 
 
    name = "Tom";
}