// Параметры строки запроса

// кроме параметров маршрута в запросе могут передаваться параметры строки запроса
// Например в запросе http://localhost:4200/item?product=phone&price=200 часть product=phone&price=200 будет представлять параметры запроса - product и price

// надо взять проект из прошлой темы 

// В этом проекте определен компонент ItemComponents
// который получает параметр маршрута. Добавим в него также получение параметров из строки запроса

import { Component} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
   
@Component({
    selector: "item-info",
    template: `<h2>Модель {{id}}</h2>
                <div>Товар: {{product}}</div>
                <div>Цена: {{price}}</div>`
})
export class ItemComponent{ 
      
    // для хранения полученных параметров определены св-ва 
    id:number|undefined;
    product:string|undefined;
    price:number|undefined;
    // получение данных из маршрута только в данном случае у класса AvtivateRoute применяется св-во queryParams, которое представлет тип Observable<Params>
    constructor(private route: ActivatedRoute){
          
        // отслеживаем изменение параметра id
        route.params.subscribe(params=>this.id=params["id"]);
        // отслеживаем изменение параметров строки запроса
        route.queryParams.subscribe(
            (queryParam: Observable<Params>) => {
                this.product = queryParam["product"];
                this.price = queryParam["price"];
            }
        );
    }
}

// и после этого мы сможем передавать через строку запроса данные в ItemComponent

// Теперь изменим код AppComponent, определим ссылки с параметрами


import { Component} from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    styles: `a {padding: 5px;}`,
    // для передачи параметров к ссылке применяется директива queryParams, которая принимает js-объект
    template: `<div>
                    <nav>
                        <a routerLink="">Главная</a>
                        <a routerLink="/about">О сайте</a>
                        <a routerLink="/item/5" [queryParams]="{>product':'phone', 'price': 200}">Item 5</a>
                        <a routerLink="/item/8" [queryParams]="{'product':'tablet'}">Item 8</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}