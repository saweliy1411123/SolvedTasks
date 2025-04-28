// для организации больших программ предназначены пространства имён
// пространства имен содержат:
// группу классов, интерфейсов, ф-й, других пространств имен,
// которые могут использоваться в некотором общем контексте
// для их определения используется ключевое слово namespace

namespace Personnel {
// чтобы типы и объекты определённые в пространстве имён были видны извне
// определяются ключевым словом export   
    export class Employee { 
     
        constructor(public name: string){
        }
    }
}

let alice = new Personnel.Employee("Alice");
console.log(alice.name);    // Alice

// пространства имен моугут содержать интерфейсы, объекты, функции, переменные и константы

namespace Personnel {
 
    export interface IUser{
        displayInfo(): void;
    }
     
    export class Employee {
        constructor(public name: string){
        }
    }
     
    export function work(emp: Employee) : void{
        console.log(emp.name, "is working");
    }
     
    export let defaultUser= { name: "Kate" }
     
    export let value = "Hello";
}
 
let tom = new Personnel.Employee("Tom")
Personnel.work(tom);                    // Tom is working
 
console.log(Personnel.defaultUser.name);    // Kate
console.log(Personnel.value);    // Hello


// обычно они хранятся в отдельном файле
// чтобы ф-онал экспортировать используется 
// "/// <reference path="personnel.ts" />"
// подключается файл где хранятся пространства имён

// далее надо объединить оба файла в один файл который
// затем можно подключать на веб-страниц
// для этого указывается опция
// --outFile target.js sourse1.ts source2.ts source3.ts ...
// в качестве первого параметра (target.js) передаётся название файла в который будут комбинироваться файлы
// а последующие параметры, файлы с кодом TS

// команда будет выглядеть так
// tsc --outFile app.js app.ts personnel.ts


// пространства имён могут быть вложены
// вложенные определяются со словом export
namespace Data{
    export namespace Personnel {
        export class Employee {
         
            constructor(public name: string){
            }
        }
    }
    export namespace Clients {
        export class VipClient {
         
            constructor(public name: string){
            }
        }
    }
}
 
let tom = new Data.Personnel.Employee("Tom")
console.log(tom.name);
 
let sam = new Data.Clients.VipClient("Sam");
console.log(sam.name);

// также есть возможность использовать псевдонимы с помощью import
// чтобы не писать одинаковый код (Например такой Data.Personnel.Employee) кучу раз

namespace Data{
    export namespace Personnel {
        export class Employee {
         
            constructor(public name: string){
            }
        }
    }
}
 
import employee = Data.Personnel.Employee;
let tom = new employee("Tom")
console.log(tom.name);