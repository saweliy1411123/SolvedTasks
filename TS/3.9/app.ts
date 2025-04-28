// в некоторых случаях мы можем использовать any, 
// чтобы функционал мог использовать данные любых типов
function getId(id: any): any {
     
    return id;
}
let result = getId(5);
console.log(result);

// мы можем конкретизировать возвращаемый тип
// можно использовать обобщения
// с помощью <T> мы указываем что ф-я getId типизирована неким T

function getId<T>(id: T): T {
     
    return id;
}

let result1 = getId<number>(5);
console.log(result1);
let result2 = getId<string>("abc");
console.log(result2);

// также можно передать обобщённые массивы 

function getString<T>(args: Array<T>): string {
     
    return args.join(", ");
}
 
let result = getString<number>( [1, 2, 34, 5]);
console.log(result);

// также кроме обобщённых массивов и ф-й бывают 
// обобщенные классы и интерфейсы

class User<T> {
 
    private _id: T;
    constructor(id:T) {
 
        this._id=id;
    }
    getId(): T {
 
        return this._id;
    }
}
 
let tom = new User<number>(3);
console.log(tom.getId()); // возвращает number
tom = new User<string>("vsf"); // ошибка, сменить тип не получится так как уже типизирован number
 
let alice = new User<string>("vsf");
console.log(alice.getId()); // возвращает string

// с интерфейсами тоже самое

interface IUser<T> {
 
    getId(): T;
}
 
class User<T> implements IUser<T> {
 
    private _id: T;
    constructor(id:T) {
 
        this._id=id;
    }
    getId(): T {
 
        return this._id;
    }
}

// иногда нужно использовать только определённые типы данных

function compareName<T>(obj1: T, obj2: T): void{
     
    if(obj1.name === obj2.name){
        console.log("Имена совпадают");
    }
    else{
        console.log("Имена различаются");
    }
 
}

let tom: {name:string} = {name: "Tom"};
let sam: {name: string} = {name: "Sam"};
// проводим проверку свойств
compareName<{name:string}>(tom, sam);

// при компиляции будет ошибка 
// нам нужно ограничить набор типов <T extends критерий_типов>

function compareName<T extends {name:string}>(obj1: T, obj2: T): void{
     
    if(obj1.name === obj2.name){
        console.log("Имена совпадают");
    }
    else{
        console.log("Имена различаются");
    }
 
}
 
let tom: {name:string} = {name: "Tom"};
let sam: {name: string} = {name: "Sam"};
compareName<{name:string}>(tom, sam);


// причем параметр T необязатльно должен представлять именно тип {name: string}

function compareName<T extends {name:string}>(obj1: T, obj2: T): void{
     
    if(obj1.name === obj2.name){
        console.log("Имена совпадают");
    }
    else{
        console.log("Имена различаются");
    }
 
}
 
class User{ 
    constructor(public name: string, public age: number){}
}
let bob = new User("Bob", 38);
let bobic = new User("Bob", 24);
compareName<User>(bob, bobic);
 
type Person = {id:number; name:string};
let tom: Person = {id:1, name: "Tom"};
let sam: Person = {id: 2, name: "Sam"};
compareName<Person>(tom, sam);


// в качестве типов могут использоваться любые типы, например, интерфейсы

interface Named{
    name: string;
}
function compareName<T extends Named>(obj1: T, obj2: T): void{
     
    if(obj1.name === obj2.name){
        console.log("Имена совпадают");
    }
    else{
        console.log("Имена различаются");
    }
}

// подобным образом ограничения обобщений можно применять в интерфейсах и классах

interface Named{
    name: string;
}
class NameInfo<T extends Named>{
 
    printName(obj: T): void{
 
        console.log(`Name: ${obj.name}`);
    }
}
 
class User{ 
    constructor(public name: string, public age: number){}
}

// класс NameInfo мы можем типизировать объекты класса, любым типом имеющим name 
// в данном случае User и Person
let bob = new User("Bob", 38);
let nameInfo1 = new NameInfo<User>();
nameInfo1.printName(bob);
 
type Person = {id:number; name:string}
let tom: Person = {id:1, name: "Tom"};
let nameInfo2 = new NameInfo<Person>();
nameInfo2.printName(tom);


// чтобы создать новый объект в коде обобщений, нам 
// надо указать, что тип T имеет конструктор
// но вот так будет ошибка 
function UserFactory<T>(): T {
    return new T(); // ошибка компиляции
}

// вместо этого нам надо указать type: {new(): T;}

function userFactory<T>(type: { new (): T; }): T {
     
    return new type();
}
 
 
class User {
 
    constructor() {
        console.log("создан объект User");
    }
}
 
let user : User = userFactory(User);