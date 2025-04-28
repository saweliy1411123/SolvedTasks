// интерфейсы

interface IUser {
    id: number;
    name: string;
}

// использование в программе
let employee: IUser = {
     
    id: 1, 
    name: "Tom"
}
console.log("id: ", employee.id);
console.log("name: ", employee.name);

// параметры методов функции также могут представлять интерфейсы 

let employee: IUser = {
     
    id: 1, 
    name: "Alice"
}
 
function printUser(user: IUser): void {
 
    console.log("id: ", user.id);
    console.log("name: ",  user.name)
}
 
printUser(employee);

// также можно возвращать объекты интерфейса

function buildUser(userId: number, userName: string): IUser {
 
    return { id: userId, name: userName };
}
 
let newUser = buildUser(2, "Bill");
console.log("id: ", newUser.id);
console.log("name: ", newUser.name);

// могут быть не обязательные свойства
interface IUser {
    id: number;
    name: string;
    age?: number;
}
let employee: IUser = {
     
    id: 1, 
    name: "Alice",
    age: 23
}
let manager: IUser = {
     
    id: 2, 
    name: "Tom"
}

// также присутствует readonly

interface Point {
    readonly x: number;
    readonly y: number;
}
let p: Point = { x: 10, y: 20 };
console.log(p);
// p.x = 5; // Ошибка - свойство доступно только для чтения

// также могут определять ф-и
// объект должен реализовать в точности то что указано в ф-и интерфейса

interface IUser {
    id: number;
    name: string;
    sayWords(words: string): void;
}
let employee: IUser = {
      
    id: 1, 
    name: "Alice",
    sayWords: function(words: string): void{
        console.log(`${this.name} говорит "${words}"`);
    }
}
  
employee.sayWords("Привет, как дела?");

// интерфейсы могут быть реализованы классами
// для этого используется implements
// класс должен реализовать все свойства и методы в интерфейсе

interface IUser {
    id: number;
    name: string;
    getFullName(surname: string): string;
}
 
class User implements IUser{
 
    id: number;
    name: string;
    age: number;
    constructor(userId: number, userName: string, userAge: number) {
 
        this.id = userId;
        this.name = userName;
        this.age = userAge;
    }
    getFullName(surname: string): string {
 
        return this.name + " " + surname;
    }
}
 
let tom = new User(1, "Tom", 23);
console.log(tom.getFullName("Simpson"));

// TS позволяет добавлять новые поля в интерфейс 
// нужно просто объявить интерфейс с тем же именем, определив необходимые поля
interface IUser {
    id: number;
    name: string;
}
interface IUser{
    age: number;
}
let employee: IUser = {
     
    id: 1, 
    name: "Alice",
    age: 31
}
 
function printUser(user: IUser): void {
 
    console.log(`id: ${user.id}  name: ${user.name}  age: ${user.age}`);
}
 
printUser(employee);

// интерфейсы могут наследоваться 

interface IMovable {
    speed: number;
    move(): void;
}
interface ICar extends IMovable {
    fill(): void;
}
class Car implements ICar {
    speed: number;
    move(): void {
 
        console.log("Машина едет со скоростью " + this.speed + " км/ч");
    }
    fill(): void {
 
        console.log("Заправляем машину топливом");
    }
}
 
let auto = new Car();
auto.speed = 60;
auto.fill();
auto.move();

// интерфейсы могут содержать определение типа ф-и

interface FullNameBuilder {
    (name: string, surname: string): string;
}
 
let simpleBuilder: FullNameBuilder = function (name:string, surname: string): string {
        return "Mr. " + name + " " + surname;
}
 
let fullName = simpleBuilder("Bob", "Simpson");
console.log(fullName); // Mr. Bob Simpson


// интерфейсы массивов

// числовой
interface StringArray {
    [index: number]: string;
}
 
let phones: StringArray;
phones = ["iPhone 7", "HTC 10", "HP Elite x3"];
 
let myPhone: string = phones[0];
console.log(myPhone);


// строчный
interface Dictionary {
    [index: string]: string;
}
 
var colors: Dictionary = {};
colors["red"] = "#ff0000";
colors["green"] = "#00ff00";
colors["blue"] = "#0000ff";
 
console.log(colors["red"]);

// существуют гибридные 

interface PersonInfo {
    (name: string, surname: string):void;
    fullName: string;
    password: string;
    authenticate(): void;
}
 
function personBuilder(): PersonInfo {
 
    let person = <PersonInfo>function (name: string, surname: string): void{
        person.fullName = name + " " + surname;
    };
    person.authenticate = function () {
        console.log(person.fullName + " входит в систему с паролем " + person.password);
    };
    return person;
}
 
let tom = personBuilder();
tom("Tom", "Simpson");
tom.password = "qwerty"; 
tom.authenticate();