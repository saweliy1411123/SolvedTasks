// Структурные директивы ngIf, ngFor, ngSwitch

// ngIf
// позволяет удалить или добавить элемент при каком то условии

import { Component} from "@angular/core";
import {NgIf} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgIf],
    template: `<p *ngIf="condition">
                  Привет мир
                </p>
                <p *ngIf="!condition">
                  Пока мир
                </p>
                <button (click)="toggle()">Toggle</button>`
})
export class AppComponent {
     
    condition: boolean=true;
     
    toggle(){
        this.condition=!this.condition;
    }
}

// с помощью ng-template, можем задавать альтернативные выражения с помощью этой директивы 
template: `<p *ngIf="condition;else unset">
Привет мир
</p>
<ng-template #unset>  
<p>Пока мир</p>  
</ng-template>   
<button (click)="toggle()">Toggle</button>`

// пример 
// если condition - true, то thenBlock, иначе else Block
template: ` <div *ngIf="condition; then thenBlock else elseBlock"></div>   
            <ng-template #thenBlock>Then template</ng-template>  
            <ng-template #elseBlock>Else template</ng-template>    
            <button (click)="toggle()">Toggle</button>`


// ngFor
// перебор элементов массива в шаблоне
import { Component} from "@angular/core";
import {NgFor} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgFor],
    template: `<ul>
                  <li *ngFor="let item of items">{{item}}</li>
                </ul>`
})
export class AppComponent {
     
    items =["Tom", "Bob", "Sam", "Bill"];
}

// также можно использовать индекс 

`<div>
    <p *ngFor="let item of items; let i = index">{{i+1}}.{{item}}</p>
</div>`

// символ звёздочки это синтаксический сахар

`<p *ngIf="condition">
    Привет мир
</p>
<p *ngIf="!condition">
    Пока мир
</p>
<ul>
    <li *ngFor="let item of items">{{item}}</li>
</ul>`

// по факту это так

`<ng-template [ngIf]="condition">
    <p>
        Привет мир
    </p>
</ng-template>
<ng-template [ngIf]="!condition">
    <p>
        Пока мир
    </p>
</ng-template>
<ul>
    <ng-template ngFor let-item [ngForOf]="items">
        <li>{{item}}</li>
    </ng-template>
</ul>`


// ngSwitch

import { Component} from "@angular/core";
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
    template: `<div [ngSwitch]="count">
                  <ng-template ngSwitchCase="1">{{count * 10}}</ng-template>
                  <ng-template ngSwitchCase="2">{{count * 100}}</ng-template>
                  <ng-template ngSwitchDefault>{{count * 1000}}</ng-template>
                </div>`
})
export class AppComponent {
     
    count = 5;
}