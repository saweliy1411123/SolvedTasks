// Программная навигация

// мы можем переходить по ресурсам внутри приложения с помощью ссылок
// но ангуляр поддерживает программную навигацию
// программным образом из любого места приложения мы можем перейти к любому ресурсу
// для этого применяется сервис Router, который определен в пакете, передается в компоненты через механизм dependency injection

// определим в компоненте кнопку и обработчик кнопки, который будет перенаправлять на определенный ресурс

import { Component} from "@angular/core";
import { RouterOutlet, RouterLink, Router} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    styles: `a {padding: 5px;}`,
    template: `<div>
                    <nav>
                        <a routerLink="">Главная</a>
                        <a routerLink="/about">О сайте</a>
                    </nav>
                    <router-outlet></router-outlet>
                    <button (click)="goHome()">На главную</button>
               </div>`
})
export class AppComponent {
      
    constructor(private router: Router){}
    // через конструктор Router и в обработчике кнопки вызываем метод navigate()
    goHome(){
        this.router.navigate([""]); // переход на корень приложения
    }
}

// Параметры маршрута и строки запроса

// Добавим форму для ввода параметров
import { Component} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet, RouterLink, Router} from "@angular/router";
 
class Item{
    constructor(public id: number, 
                public product: string, 
                public price: number){}
}
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink, FormsModule],
    styles: `a {padding: 5px;}`,
    template: `<div>
                    <div  class="form-group">
                        <h3>Параметры объекта</h3>
                        <p>
                            <label>Номер модели</label><br>
                            <input type="number" [(ngModel)]="item.id" />
                        <p>
                        <p>
                            <label>Цена</label><br>
                            <input type="number" [(ngModel)]="item.price" />
                        <p>
                        <p>
                            <label>Товар</label><br>
                            <input [(ngModel)]="item.product" />
                        <p>
                        <button (click)="goToItem(item)">Перейти</button>
                    </div>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {
      
    item: Item = new Item(1, "", 0);
    constructor(private router: Router){}
      
    goToItem(myItem: Item){
        // для передачи компоненту ItemComponent нужных параметров в метод navigate первого параметра передается путь, а последующие значения для параметров маршрута
        // второй параметр представляет объект JS, который содержит все нужные значения для параметров строки запроса
        this.router.navigate(
            ["/item", myItem.id], 
            {
                queryParams:{
                    "product": myItem.product, 
                    "price": myItem.price
                }
            }
        );
    }
}

// код компонента ItemComponent такой же как и в прошлой теме

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
      
    id:number|undefined;
    product:string|undefined;
    price:number|undefined;
 
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