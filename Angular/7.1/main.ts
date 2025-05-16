// Определение Маршрутов 

// маршрутизации позволяет сопоставлять запросы к приложению с определёнными ресурсами внутри приложения

// ключевым для работы маршрутизации является модуль RouterModule
// который располагается в пакете @angular/router, поэтому в package.json он должен быть указан

{
    "name": "helloapp",
    "version": "1.0.0",
    "description": "First Angular 19 Project",
    "author": "Eugene Popov <metanit.com>",
    "scripts": {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build"
    },
    "dependencies": {
        "@angular/router": "~19.0.0",
        // остальные пакеты
    },
    "devDependencies": {
          
        // остальные пакеты
    }
}


// для работы с маршрутизацией в первую очередь стоит определить базовый адрес приложения 
// в index.html добавим в секцию <head> элемент <base>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <base href="/" />
    <title>Hello Angular 19</title>
</head>
<body>
    <my-app>Загрузка...</my-app>
</body>
</html>

// каждый маршрут сопоставляется с определнным компонентом 
// поэтому добавим в проект ряд компонентов 
// добавим в папку src/app/home.component.ts 

import { Component} from "@angular/core";
  
@Component({
    selector: "home-app",
    template: "<h2>Главная</h2>"
})
export class HomeComponent { }


// этот компонент выводит заголовок

// далее добавим в папку src/app/about.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "about-app",
    template: "<h2>О сайте</h2>"
})
export class AboutComponent { }

// также добавим ещё один файл not-found.component.ts

import { Component} from "@angular/core";
  
@Component({
    selector: "not-found-app",
    template: "<h2>Страница не найдена</h2>"
})
export class NotFoundComponent { }



// Добавление и установка маршрутов
// для каждого надо определить свой маршрут 
// для этого в папке создаём src/app/app.config.ts 


// импорт для установки маршрутов и представления коллекции маршрутов
import { provideRouter, Routes } from "@angular/router"; 

// конфигурацию приложения ApplicationConfig
import { ApplicationConfig } from "@angular/core";
 
// компоненты, которые сопоставляются с маршрутами
// набор маршрутов
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {NotFoundComponent} from "./not-found.component";
 
// определение маршрутов
const appRoutes: Routes =[
    // для указания маршрута применяется параметр path
    { path: "", component: HomeComponent},
    // http://localhost:3000/about
    { path: "about", component: AboutComponent},
    // если запрос не подходит под один из выше определенных маршрутов, то он будет представлять любой путь(**)
    { path: "**", component: NotFoundComponent }
];
 
// для применения маршрутов, создаем объект ApplicationConfig и устанавливаем его св-во 
export const appConfig: ApplicationConfig = {
  // здесь providerRouter (для установки маршрутов)
  providers: [provideRouter(appRoutes)]
};

// теперь всё это надо применить в файле main.ts

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import {appConfig} from "./app/app.config";
bootstrapApplication(AppComponent, appConfig);



// RouterOutler
// чтобы можно было внедрить компонент в AppComponent который обрабатывает запрос нужно использовать RouterOutler

import { Component} from "@angular/core";
import { RouterOutlet} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet],
    // на место router-outlet будет рендериться компонент, выбранный для обработки запроса
    template: `<div>
                    <h1>Приложение Angular</h1>
                    <router-outlet></router-outlet>
               </div>`,
})
export class AppComponent {}

// URL Matching и порядок маршрутов 

// адреса сопоставляются URL запрос (например /about) с path, это называется URL Matching

// Переадресация 

// мы можем сделать переадресацию по другому пути 
// например, если нужного маршрута не найдено, то можем проложить другой путь

// для этого указываем redirectTo
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    { path: "about", component: AboutComponent},
    { path: "**", redirectTo: "/"}
];


// также можем задать критерий соответствия строки запроса маршруту с помощью параметра pathMatch
// значит, что адрес должен чётко соответствовать если мы перейдём на /contact, то перейдет на /about
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    { path: "about", component: AboutComponent},
    { path: "contact", redirectTo: "/about", pathMatch:"full"},
    { path: "**", redirectTo: "/"}
];