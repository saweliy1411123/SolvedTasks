// пусть в проекте у нас будет файл devices.ts
// в котором есть экспортируемые сущности
export interface Device{
    name: string;
}
     
export class Phone implements Device {
    name: string;
    constructor(n:string){
        this.name = n;
    }
}
     
export function call(phone: Phone) : void{
    console.log("Make a call by", phone.name);
}

// можно сделать по другому
interface Device{
    name: string;
}
     
class Phone implements Device {
    name: string;
    constructor(n:string){
        this.name = n;
    }
}
     
function call(phone: Phone) : void{
    console.log("Make a call by", phone.name);
}
export {Device, Phone, call};

// а чтобы использовать экспор. сущности пишем import
// после import указываются набор сущностей которые мы хотим задействовать из файла 
// а после from указывается путь
import {Phone, call} from "./devices";
let iphone: Phone = new Phone("iPhone X");
call(iphone);


// для компонента можно указать псевдоним с помошью as

import {Phone, call as makeCall} from "./devices.js";
let iphone: Phone = new Phone("iPhone X");
makeCall(iphone);

// псевдоним можно было указать при экспорте
export {Device, Phone, call as makeCall};
// но потом в импорте надо указать псевдоним
import {Phone, makeCall} from "./devices.js";
// можно импортировать сразу всё * с псевдонимом 
import * as dev from "./devices.js";


// можно экспортировать по умолчанию

export default class SmartWatch{
      
    constructor(private model:string){}
     
    printModel(){
        console.log(`Model: ${this.model}`);
    }
}
// ключевое слово default позволяет установить класс SmartWatch
// в качестве типа по умолчанию

import SmartWatch from "./smartwatch.js";
let watch: SmartWatch = new SmartWatch("Apple Watch");
watch.printModel();

// можно использовать другое имя
import Watch from "./smartwatch.js";
let watch: Watch = new Watch("Apple Watch 2");
watch.printModel();