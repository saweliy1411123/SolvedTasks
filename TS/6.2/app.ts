// Декораторы метода
// представляет ф-ю, которая принимает три параметра
// 1 - ф-я конструктора класса для статического метода, либо прототип класса для обычного метода
// 2 - название метода, 3 - объект интерфейса PropertyDescriptor
function deprecated(target: any, propertyName: string, descriptor: PropertyDescriptor){ 
    console.log("Method is deprecated");
}

// этот объект описывает изменение декорируемого метода
// применяется при компиляции в ES5 и выше, при ES3 - undefined
interface PropertyDescriptor{
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean; // учитывает, является ли ф-я модифицируемой
    get? (): any;
    set? (v: any): void;
}


// определим простейший декоратор для метода

function readable (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false; // с помощью этого, устанавливает, что метод, к которому применяется данный декоратор, не должен быть изменен
};
 
class User {
 
    name: string;
    constructor(name: string){
        this.name = name;
    }
 
    @readable
    print():void{
        console.log(this.name);
    }
}
let tom = new User("Tom");
tom.print = function(){console.log("print has been changed");} // в итоге следующая инструкция не будет работать
tom.print();  // Tom



// декоратор может принимать параметры, которые позволяют настроить из вне поведение декоратора
function readable(onlyRead : boolean){ // теперь readable принимает параметр типа boolean
 
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.writable = !onlyRead;
    };
}
// в итоге мы передадим @readable(true), который говорит что нельзя перезаписывать
class User {
 
    name: string;
    constructor(name: string){
        this.name = name;
    }
 
    @readable(true) // в скобках можно передать значения параметров
    print():void{
        console.log(this.name);
    }
}
let tom = new User("Tom");
tom.print = function(){console.log("print has been changed");}
tom.print();  // Tom



// Декоратор метода, позволяет нам манипулировать параметрами 
// и возвращаемым результатом метода
function log(target: Object, method: string, descriptor: PropertyDescriptor){
    let originalMethod = descriptor.value; // начальное значение метода, это та ф-я которую представляет метод
    // дальше идет переустановка значения
    descriptor.value = function(...args: number[]){
        console.log(JSON.stringify(args));
        let returnValue = originalMethod.apply(this, args);
        console.log(`${JSON.stringify(args)} => ${returnValue}`)
        return returnValue;
    }
}
 
class Calculator{
 
    @log
    add(x: number, y: number): number{
        return x + y;
    }
}
 
let calc = new Calculator();
let z = calc.add(4, 5);
z = calc.add(6, 7);



// Декораторы параметров методов
// представляет ф-ю, которая принимает три параметра
// 1 - конструктор класса, если метод статический, либо прототип класса, если метод нестатический
// 2 - имя метода, 3 - порядковый индекс параметра в списке параметров
function MyParameterDecorator(target: Object, propertyKey: string, parameterIndex: number){
    // код декоратора
}


// определим декоратор для параметра метода

function logParameter(target: any, key : string, index : number) {
    var metadataKey = `__log_${key}_parameters`; // добавляет новое свойство, массив с индексами декорированных параметров
     
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(index);
      }
      else {
        target[metadataKey] = [index];
    }
}
// для чтения метаданных из свойства metadataKey применяется logMethod,
// который перебирает все параметры методаЮ находит значения по индексам, которые определены декоратором параметра,
// и выводи на консоль названия и значения декорированных параметров

function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
 
    var originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
 
        var metadataKey = `__log_${key}_parameters`;
        var indices = target[metadataKey];
 
        if (Array.isArray(indices)) { 
            for (var i = 0; i < args.length; i++) { 
         
                if (indices.indexOf(i) !== -1) { 
                    var arg = args[i];
                    var argStr = JSON.stringify(arg) || arg.toString();
                    console.log(`${key} arg[${i}]: ${argStr}`);
                }
            }
            var result = originalMethod.apply(this, args);
            return result;
        }
        else {
            var a = args.map(a => (JSON.stringify(a) || a.toString())).join();
            var result = originalMethod.apply(this, args);
            var r = JSON.stringify(result);
            console.log(`Call: ${key}(${a}) => ${r}`);
            return result;
        }
    }
    return descriptor;
}
 
class User {
 
    private name: string;
    constructor(name: string){
        this.name = name;
    }
   @logMethod
    setName(@logParameter name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}
let tom = new User("Tom");
tom.setName("Bob");
tom.setName("Sam");