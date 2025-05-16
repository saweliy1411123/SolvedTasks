// Дочерние маршруты

// если выбранный компонент сам должен принимать в качестве внутреннего содержимого какой-то другой компонент в зависимости от запроса
// В этом случае нам нужны дочерние маршруты

// берем проект из прошлых тем
// добавим файл src/app/item.details.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "item-details",
    template: `<h2>Информация о товаре</h2>`
})
export class ItemDetailsComponent{}

// туда же добавим ещё файл item.stat.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "item-stat",
    template: `<h2>Статистика товара</h2>`
})
export class ItemStatComponent{}

// мы бы могли определить прямые маршруты к этим компонентам
{ path: "item/:id/details", component: ItemDetailsComponent},
{ path: "item/:id/stat", component: ItemStatComponent},

// в данном случае id также параметр маршрута представляющий условный id товара


// но такие маршруты не используют ItemComponent 
// поэтому надо использовать другую организацию маршрутов
// для этого изменим файл app.config.ts 



// каждый из дочерних маршрутов сопоставляется с частью адреса url 
// чтобы применить такие маршруты применяется св-во children
import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
 
import {HomeComponent} from "./home.component";
 
import { ItemComponent }   from "./item.component";
import { ItemStatComponent }   from "./item.stat.component";
import { ItemDetailsComponent }   from "./item.details.component";
 
// определение дочерних маршрутов
const itemRoutes: Routes = [
    { path: "details", component: ItemDetailsComponent},
    { path: "stat", component: ItemStatComponent},
];
 
const appRoutes: Routes =[
 
    { path: "item/:id", component: ItemComponent},
    { path: "item/:id", component: ItemComponent, children: itemRoutes},
    { path: "", component: HomeComponent}
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};

// Теперь изменим ItemComponent

import { Component} from "@angular/core";
import { ActivatedRoute, RouterOutlet} from "@angular/router";
  
@Component({
    selector: "item-info",
    standalone: true,
    imports: [RouterOutlet],
    // для вставки компонентов ItemDetailsComponent и ItemStatComponent здесь определен router-outlet
    template: `<h1>Товар {{id}}</h1>
               <router-outlet></router-outlet>`
})
export class ItemComponent{ 
     
    id: number;
     
    constructor(private route: ActivatedRoute){
         
        route.params.subscribe(params=>this.id=params["id"]);
    }
}

// и изменим главный компонент AppComponent 
// добавив в него для тестирования ссылки на ItemDetailsComponent и ItemStatComponent

import { Component} from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    styles: `a {padding: 3px;}`,
    template: `<div>
                    <nav>
                        <a routerLink="">Главная</a> |
                        <a routerLink="/item/5/details">Информация о товаре</a> |
                        <a routerLink="/item/5/stat">Статистика товара</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}

// при переходе будет срабатывать марщрутизация и будет передаваться параметр маршрута - id 

а