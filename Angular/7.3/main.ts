// Параметры маршрутов

// маршруты могут определять параметры, через которые мы можем передавать компоненту какие-то данные извне
// для примера проект из прошлой темы

// в папку добавим src/app/item.component.ts

import { Component} from "@angular/core";
// для получения параметров маршрута нам необходим спец. сервис ActivatedRoute
// он содержит инфу о маршруте в частности параметры маршрута, параметры строки запроса и прочее
// он внедряется в приложение через механизм dependency injection
import { ActivatedRoute} from "@angular/router";
   
@Component({
    selector: "item-info",
    template: `<h2>Модель {{id}}</h2>`
})
export class ItemComponent { 
      
    id: number;
    constructor(private activateRoute: ActivatedRoute){
        // snapshot хранит состояние маршрута, а оно содержит переданные параметры 
        // мы предполагаем, что параметр будет называться "id", но это необязательно. Название параметра может быт любым
        this.id = activateRoute.snapshot.params["id"];
    }
}

// пока нет никакого маршрута, который бы использовал данный компонент
// изменим опредедение маршрутов в файле app.config.ts

import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
 
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {NotFoundComponent} from "./not-found.component";
import {ItemComponent} from "./item.component";
 
// определение маршрутов
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    { path: "about", component: AboutComponent},
    // новый маршрут, токен представляет параметр маршрута. То есть мы сможем обратиться к компоненту с запросом (/item/6)
    { path: "item/:id", component: ItemComponent},
    { path: "**", component: NotFoundComponent}
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};

// теперь изменим главный компонент AppComponent

import { Component} from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `<div>
                    <nav>
                        <a routerLink="">Главная</a>
                        <a routerLink="/about">О сайте</a>
                        <a routerLink="/item/5">Item 5</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}

// это работает с одной ссылкой, но если у нас их несколько 
<a routerLink="/item/5">Item 5</a>
<a routerLink="/item/8">Item 8</a>


// для этого нам надо динамически изменять значение в компоненте ItemComponent

import { Component} from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
   
@Component({
    selector: "item-info",
    template: `<h2>Модель {{id}}</h2>`
})
export class ItemComponent { 
      
    id: number | undefined;
    private subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute){
        // subscribe позволяет установить подписку на изменение параметра маршрута, в этом случае компонент
        // будет получать новое значение и проблем разных параметров не возникнет
        this.subscription = activateRoute.params.subscribe(params=>this.id=params["id"]);
    }
}

// для решения выше озвученной проблемы также есть и другое решение, поменяем ItemComponent

import { Component, OnInit} from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { switchMap } from "rxjs/operators";
   
@Component({
    selector: "item-info",
    template: `<h2>Модель {{id}}</h2>`
})
export class ItemComponent implements OnInit { 
       
    id: number | undefined;
      
    constructor(private route: ActivatedRoute){}
    // в данном случае получение id происходит в методе ngOnInit
    ngOnInit() {
        // идет обращение ...paramMap которая представляет карту параметров маршрута Observable<ParamMap>
        // далее у Observable вызывается метод pipe, который позволяет создать цепочку операторов rxjs
        this.route.paramMap.pipe(
            // вызывается оператор switchMap, который принимает ф-ю с одним параметром - ParamMap
            // так образом мы извлекаем карту параметров иберем из нее значение параметра id. При изменении значения параметра switchMap позволяет получить новое значение
            switchMap(params => params.getAll("id"))
        )
        // изначально значение параметра id представляет строку, поэтому далее с помощью метода subscribe мы подписываемся на объект Observable и при наличии данных извлекаем значение id
        // указывается преобразования к числу с помощью +
        .subscribe(data=> this.id = +data);
      }
}