// если мы хотим использовать ф-нал библиотек в TS
// можно взять готовые файлы для того чтобы не создавать свои файлы определений

// https://github.com/DefinitelyTyped/DefinitelyTyped/

// вначале загрузим определение типов для библиотеки jquery с помощью команды
// npm install --save-dev @types/jquery


// В итоге в проекте будет создана папка node_modules/@types,
//  в которой каталог jquery будет хранить заголовочные файлы для библиотеки jquery.
// также будет создан файл package.json в котором 
// {
//     "devDependencies": {
//         "@types/jquery": "^3.5.5"
//     }
// }

// теперь в файле конфигурации указываем путь к загаловочным файлам 


// {
//     "compilerOptions": {
//         "noImplicitAny": true,
//         "noEmitOnError": true,
//         "strictNullChecks": true,
         
//         "outFile": "app.js",
         
//         "typeRoots": [ // вот здесь
//           "node_modules/@types" 
//         ],
//     }
// }

// html
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8" />
//     <title>Metanit.com</title>
// </head>
// <body>
//     <div id="content"></div>
//     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
//     <script src="app.js"></script>
// </body>
// </html>


// использование в TS

// В данном случае мы задействуем событие document.ready, 
// которое определено в jquery и которое срабатывает при загрузке документа. 
// И далее с помощью лямбда-выражения, которое определяет функцию обратного вызова,
//  с помощью синтаксиса jquery на веб-страницу добавляется новый элемент

$(document).ready(() => {
    $("#content").html("<h1>Привет TypeScript</h1>");
});

// можно сократить 

$(() => {
    $("#content").html("<h1>Привет TypeScript</h1>");
});


// в итоге проект будет выглядеть так

// node_modules
// app.ts
// index.html
// package.json
// package-lock.json
// tsconfig.json


// определим кнопку в html 

// вот так идёт обработка нажатия на эту кнопку
$(() => {
    $("#alertBtn").click((e) => { $("#content").html("<h2>Привет мир</h2>"); });
});