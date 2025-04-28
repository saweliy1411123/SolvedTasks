// Модули

// если файлы не содержат вырадений import export верхнего уровня
// файл рассматривается как обычный скрипт
// такие файл можно склеить --outFile

// чтобы сделать из простого скрипта модуль, достаточно добавить в файл export {};

// создадим файл 
message.ts 
// в котром будет такой код

// данный файл будет является модулем, так как присутствует export 
// а также его ф-ю можно импортировать в другие модули
// default - тип экспортируемый по умолчанию

export default function hello() {
    console.log("Hello Typescript");
}

// теперь подключим эту ф-ю в другой файл
// например в файл main.ts 
// предполагается что все файлы должны находится в одной папке

import hello from "./message.js";
hello();

// при компиляции из cmd или терминала для установки модуля необходимо
// передать соответствующее значение параметру --module

tsc --module commonjs main.ts // для CommonJS
tsc --module amd main.ts // для AMD
tsc --module umd main.ts // для UMD
tsc --module system main.ts // для SytemJS
tsc --module esnext main.ts // для ESNext

// В данном случае у нас оба модуля - main.ts и message.ts являются модулями ES, 
// то есть в качестве типа модуля необходимо выбрать "ES2015", "ES2020" или "ESNext".


// для компиляции вводим команду
// tsc main.ts --module esnext

// в файле html прописываем
// <script type="module" src="main.js"></script>

// создадим в папке с файлами модулей файл сервера
// server.js
const http = require("http");
const fs = require("fs");
   
http.createServer(function(request, response){ // создание
       
    // получаем путь после слеша
    let filePath = request.url.substr(1);
    if(filePath == "") filePath = "index.html"; 
    fs.readFile(filePath, function(error, data){ // считывание и отправка
               
        if(error){
                   
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            if(filePath.endsWith(".js")) response.setHeader("Content-Type", "text/javascript");
            response.end(data);
        }
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
});

// это самый примитивный сервер, который отдаёт пользователю статические файлы
// Стоит отметить, что при отправке модулей js нам надо устанавливать mime-тип отправляемого контента в "text/javascript":
if(filePath.endsWith(".js")) response.setHeader("Content-Type", "text/javascript");
// запускаем сервер с помощью команды
node server.js

// после запуска переходим по адресу
// http://localhost:3000

// результат нашего код на TS



// Вместо того, чтобы указывать тип модуля в консоли при компиляции, можно использовать 
// соответствующие параметры в файле конфигурации tsconfig.json. Так, параметр module задает тип модуля:

{
    "compilerOptions": {
        "noImplicitAny": true,
        "noEmitOnError": true,
        "strictNullChecks": true,
        "outFile": "main.js"
         
        "target": "es2015",
        "module": "esnext"
    }
}