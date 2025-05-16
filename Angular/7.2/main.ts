// Создание ссылок

// в прошлой теме в файле app.config.ts было определено три маршрута 

import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
 
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {NotFoundComponent} from "./not-found.component";
 
// определение маршрутов
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    { path: "about", component: AboutComponent},
    { path: "**", component: NotFoundComponent}
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};



// Добавим в проект навигацию, для этого определим в компоненте AppComponent набор ссылок для навигации
import { Component} from "@angular/core";
// для определение адресов ссылок применяется директива RouterLink
import { RouterOutlet, RouterLink} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    styles: `a {padding: 5px;}`,
    // в соответствии с первым маршрутом HomeComponent, указывается пустая строка <a routerLink="">
    template: `<div>
                    <nav>
                        <a routerLink="">Главная</a>
                        <a routerLink="/about">О сайте</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`,
})
export class AppComponent {}


// Стилизация активных ссылок
// применяется директива routerLinkActive, которая указывает на класс css применяемый к активной ссылке 
// изменим класс компонента

import { Component} from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive} from "@angular/router";
 

// будет подсвечиваться активная ссылка 
// но при этом при нажатии на другую ссылку, будут подсвечиваться обе ссылки 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    styles: `a {padding: 5px;}
            .active {color:red;}`,
    template: `<div>
                    <nav>
                        <a routerLink="" routerLinkActive="active">Главная</a>
                        <a routerLink="/about" routerLinkActive="active">О сайте</a>
                    </nav>
                    <router-outlet></router-outlet>
               </div>`,
})
export class AppComponent {}

// для решения это проблемы надо применить доп настройки с помошью директивы routerLinkActiveOptions
// значение {exact:true} указывает на то, что для установки активной сслыки будет применяться полное соответствие
`<nav>
    <a routerLink="" routerLinkActive="active"
        [routerLinkActiveOptions]="{exact:true}">Главная</a>
    <a routerLink="/about" routerLinkActive="active">О сайте</a>
</nav>`