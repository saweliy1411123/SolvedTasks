// Декораторы

// в TS являются эксперементальной ф-нальностью 
// языка, поэтому при компиляции следует указывать параметр

{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true // вот здесь
    }
}

// либо через параметры в cmd 
// tsc app.ts -t ES5 --experimentalDecorators


// Декоратор класса применяется к конструктору класса и позволяет изменять
// или заменять определение класса

// принимает 1 параметр
function classDecoratorFn(constructor: Function){ }

// определим простейший декоратор
// декоратор sealed с помощью ф-и Object.seal запрещает расширение прототипа класса User
function sealed(constructor: Function) {
    console.log("sealed decorator");
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// для применения декоратора используется @
// ставится перед названием класса 
@sealed
class User {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}

// из за применения декоратора, мы не сможем 
// добавить новое свойство следующим образом:
Object.defineProperty(User, 'age', {
    value: 17
});


// Также декораторы могут изменять результат работы конструктора
// В этом случае определение ф-и декоратора немного меняется 

// декоратор типизирован типом TFunction, который является расширением Function
// передаётся конструктор target, но он никак не используется 
function logger<TFunction extends Function>(target: TFunction): TFunction{
 
    let newConstructor: Function = function(name:string){
        console.log("Creating new instance");
        this.name = name;
        this.age = 23;
        this.print = function():void{
            console.log(this.name, this.age);
        }
    }
    return <TFunction>newConstructor;
}
 
@logger
class User {
    name: string;
    constructor(name: string){
        this.name = name;
    }
    print():void{
        console.log(this.name);
    }
}
let tom = new User("Tom");
let bob = new User("Bob");
tom.print();
bob.print();