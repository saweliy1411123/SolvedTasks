import { Component } from "@angular/core";
 
@Component({
    selector: "my-app",
    standalone: true,
    template: `<h1>Hello Angular</h1>
            <p>Приложение Angular состоит из компонентов</p>`,
    // мы можем указывать стили, но для участка my-app
    styles: [` 
            h1, h2{color:navy;}
            p{font-size:13px; font-family:Verdana;}
    `]
    // начиная с версии 17, необязательно массивом, можно и ``
    styles:` 
        h1, h2{color:navy;}
        p{font-size:13px; font-family:Verdana;}
    `
    // можно указать селектор :host, который позволяет применить стили к этому элементу, указывается в стилях
    styles:` 
        h1, h2{color:navy;}
        p{font-size:13px; font-family:Verdana;}
	:host {
          font-family: Verdana;
          color: #555;
       }
    `

})
export class AppComponent { }


// стили можно вынести в отдельный файл, например app.component.css
// с таким содержимым

h1, h2{color:navy;}
p{font-size:13px;}
:host {
    font-family: Verdana;
    color: #555;
}

// и потом так обозначить в app.components.ts
styleUrls: ['./app.component.css'] 



// также работает и с шаблоном html, в файле app.component.html

<h1>Hello Angular</h1>
<p>Приложение Angular состоит из компонентов</p>

// вот так его импортируем
templateUrl: './app.component.html',



