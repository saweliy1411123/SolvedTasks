// Создание структурных директив

// добавим в проект src/app новый файл while.directive.ts
// этот файл будет содержать директиву 

import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
  
@Directive({ selector: "[while]", standalone:true })
export class WhileDirective {
     
    constructor(private templateRef: TemplateRef<any>, 
                private viewContainer: ViewContainerRef) 
    { }
     
    @Input() set while(condition: boolean) {
        // для получения доступа к шаблону используется TemplateRef
        if (condition) {
        // рендеринг шаблона  
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {   
        // удаляем элемент из разметки 
          this.viewContainer.clear();
        }
    }
}

// применим директиву в главном компоненте AppComponent

import { Component} from "@angular/core";
import {WhileDirective} from "./while.directive";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [WhileDirective],
    template:`<p *while="condition">
      Первый параграф
    </p>
    <p *while="!condition">
      Второй параграф
    </p>
    <button (click)="toggle()">Toggle</button>`
})
export class AppComponent {
     
    condition = true;
    toggle(){
        this.condition=!this.condition;
    }
}