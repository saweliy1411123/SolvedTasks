// Работа с заголовочными файлами

// для установки связи с внешними файлами скриптов JS
// в TS служат декларативные или заголовочные файлы
// файлы с расширением .d.ts
// выполняют роль обёрток над библиотеками



// при компиляции в коде ts если мы используем глобальную переменную (в html <script> let ....)
// эта переменная не существует
// для того чтобы решить проблему создадим globals.d.ts с содержимым	
declare let message: string;
// подключается определение глобальной переменной
// ссылку на этот файл надо оставить внутри ts файла
//  "/// <reference path="globals.d.ts" />"


// её можно не указывать если полагаемся на файл конфигурации tsconfig.json 
// тогда можно просто не указывать "/// <reference path="globals.d.ts" />" и писать tsc в консоль

// для ф-й
// пусть на веб-странице в коде script указаны ф-и hello, sum
let message = "Hello TypeScript!";
function hello(){
    console.log(message);
}
         
function sum(a, b){
    return a + b;
}
// и допустим в файле ts мы их вызываем 
hello();
 
let result = sum(2, 5);
console.log(result);

// тогда
declare function hello(): void;
declare function sum(a: number, b: number): number;





// для объектов 
// html
const tom = {
    name: "Tom",
    age: 37,
    print(){
        console.log(`Name: ${this.name}  Age: ${this.age}`);
    }
}
// ts файл
tom.print();
// globals.d.ts
declare const tom: {name: string, age: number, print: ()=> void};


// сложные объекты
var points = [{ X: 10, Y: 34 },
    { X: 24, Y: 65 },
     { X: 89, Y: 12 }];

// можем подключить массив объектов некоторого интерфейса для свойств X и Y
interface IPoint {
    X: number;
    Y: number;
}
declare var points: IPoint[];




// классы 

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    display(){
        console.log(this.name, this.age);
    }
}

declare class Person{
     
    name: string;
    age: number;
    constructor(name: string, age: number);
    display(): void;
}