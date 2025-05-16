// Guards 

// позволяет ограничить навигацию по определенным маршрутам
// например для доступа при наличии условий, идет защита guards к ресурсу 

// canActivate 
// представляет один из типов guards, который позволяет управлять доступом к ресурсе при маршрутизации
// canActivate должен предсталвять ф-ю, которая имеет следующее опредление 

// получает 2 параметра, которые содержат информацию о запросе
// ActivatedRouteSnapshot позволяет получить различную инфу из запроса, параметры маршрута и строки запроса
type CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
     Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

// Если бы в маршруте использовался параметр id, то мы могли бы его здесь получить

// чтобы разрешить доступ возвращает true, иначе - false
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
         
        // получаем id
        //console.log(route.params["id"]);
         
        // остальной код
    }


// в файле src/app/home.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "home-app",
    template: `<h2>Главная</h2>`
})
export class HomeComponent { }

// в файле src/app/about.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "about-app",
    template: `<h2>О сайте</h2>`
})
export class AboutComponent {  }

// Допустим мы хотим ограничить доступ к компоненту AboutComponent
// для этого добавим src/app/about.guard.ts

// здесь опредлена ф-я aboutGuard, которая соответствует canActivate
// для тестирования обоих ситуаций здесь вызывается метод confirm()
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
 
export const aboutGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log(route.routeConfig?.path);    // можно получить различную информацию о маршрутах, параметрах и ит.д.
    return confirm("Вы уверены, что хотите перейти?");
};

// определим в файле app.component.ts
import { Component} from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    styles: `a {padding: 3px;}`,
    template: `<div>
                    <h1>Маршрутизация в Angular 19</h1>
                    <nav>
                        <a routerLink="">Главная</a>
                        <a routerLink="/about">О сайте</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}

// в файле app.config.ts

import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
 
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import { aboutGuard }   from "./about.guard";
 
// определение маршрутов
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    // чтобы ограничить доступ по маршруту указывается canActivate: [aboutGuard]
    // в итоге при попытке перейти отобразится confirm
    { path: "about", component: AboutComponent, canActivate: [aboutGuard]}
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};



// Внедрение сервисов

// Определим src/app/auth.service.ts

import { Injectable } from "@angular/core";
 
@Injectable({
  providedIn: "root",       // глобальный сервис
})
export class AuthService {
  isLoggedIn = true;
  login(): void { this.isLoggedIn = true; }
  logout(): void { this.isLoggedIn = false;}
}

// изменим файл about.guard.ts

// чтобы производить переход в зависимости от того, залогинен ли пользователь
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
 
export const aboutGuard = () => {
    const authService = inject(AuthService);    // получаем сервис
    return authService.isLoggedIn
};


// CanDeactivate
// позволяет управлять переходами, проверяет возможность ухода
// предназначен для случаев когда пользователь вводит данные, но не сохраняет их и покидает страницу
// в этом случае мы могли бы выдать пользователю какое-либо предупреждение или окно с подтверждением перехода
// чтобы избежать потерю введённых данных


type CanDeactivateFn<T> = (component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, 
    nextState: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;


// изменим AboutComponent, для управления навигацией

import { Component} from "@angular/core";
import { RouterLink } from "@angular/router";
   
@Component({
    selector: "about-app",
    standalone: true,
    imports: [RouterLink],
    template: `<h2>О сайте</h2>
                <button class="btn btn-default" (click)="save()">Сохранить</button>
                <a routerLink="">На главную</a>
                `
})
// для имитации ф-ла добавлено св-во saved, которое указывает, сохранены ли данные
export class AboutComponent  { 
    saved: boolean = false;
    save(){
        this.saved = true;
    }
}

// для управления переходом с AboutComponent 
// добавим src/app/exit.about.guard.ts

import { AboutComponent }   from "./about.component";
  
// в качестве параметра, передаётся тип компонента, с которого осуществляется переход

// если ф-я возвращает true, то выполняется переход со страницы
// иначе остается на странице
export const exitAboutGuard=(component: AboutComponent) =>{
    // если данные не сохранены, выводит confirm
    if(!component.saved){
        return confirm("Вы хотите покинуть страницу?");
    }
    return true;
}

// Чтобы задействовать exitAboutGuard 
// изменим маршрут для AboutComponent в файле app.config.ts

import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
 
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import { exitAboutGuard }   from "./exit.about.guard";
 
// определение маршрутов
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    // теперь при попытке ухода с комопонента saved == false, увидим диалоговое окно
    { path: "about", component: AboutComponent, canDeactivate: [exitAboutGuard]}
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};


