// Преобразование типов

// рассмотрим иерархию типов
class Person {
  
    name: string;
    constructor(userName: string) {
  
        this.name = userName;
    }
}
  
class Employee extends Person {
  
    company: string;
    constructor(userName: string, company: string) {
  
        super(userName);
        this.company = company;
    }
}


// поскольку класс Employee унаследован от класса Person, объекты Employee
// являются объектами Person, то при определении можем написать так
let tom : Person = new Employee("Tom", "Microsoft");

// везде где передаётся в параметрах или в возвр. объекте Person, можно заменить на Employee
class Person {
  
    name: string;
    constructor(userName: string) {
  
        this.name = userName;
    }
}
  
class Employee extends Person {
  
    company: string;
    constructor(userName: string, company: string) {
  
        super(userName);
        this.company = company;
    }
}
 
function printPerson(user: Person): void{
    console.log(`Person ${user.name}`);
}
  
function personFactory(userName: string): Person {
    return new Employee(userName, "не установлено");
}
  
let tom : Person = new Employee("Tom", "Microsoft");
printPerson(tom);
 
let bob = personFactory("Bob");
printPerson(bob);


// здесь указывается на создание объекта Employee 
// но мы не сможем вывести потому что top, это переменная типа Person 
// и в ней нет свойства company

class Person {
  
    name: string;
    constructor(userName: string) {
  
        this.name = userName;
    }
}
  
class Employee extends Person {
  
    company: string;
    constructor(userName: string, company: string) {
  
        super(userName);
        this.company = company;
    }
}
 
let tom : Person = new Employee("Tom", "Microsoft");
console.log(tom.company);   // ошибка - в классе Person нет свойства company

// чтобы решить эту проблему мы можем преобразовать к типу Employee

let tom : Person = new Employee("Tom", "Microsoft");
 
let tomEmployee: Employee = <Employee>tom; // преобразование к типу Employee
console.log(tomEmployee.company);
  
// или так
console.log((<Employee>tom).company);

// Выражение <Тип> переменная (<Employee>tom) позволяет преобразовать переменную к типу, 
// который идет в угловых скобках.

// альтернативный способ 

let tom : Person = new Employee("Tom", "Microsoft");
 
let tomEmployee: Employee = tom as Employee; // преобразование к типу Employee
console.log(tomEmployee.company);
  
// или так
console.log((tom as Employee).company);


// объявим интерфейс который пока не трогает Person и Employee

interface IPerson {
    name: string;
}
class Person {
  
    name: string;
    constructor(userName: string) {
  
        this.name = userName;
    }
}
  
class Employee extends Person {
  
    company: string;
    constructor(userName: string, company: string) {
  
        super(userName);
        this.company = company;
    }
}
function printPerson(user: IPerson): void {
    console.log(`IPerson ${user.name}`);
}

// 
let tom: Person = new Employee("Tom", "Microsoft");
printPerson(tom);
  
printPerson({ name: "Sam" });
//printPerson({ name: "Bob", company:"Microsoft" }); // ошибка
// так как в IPerson нет свойства company

// но используя преобразование типов всё заработает
printPerson({ name: "Bob", company:"Microsoft" } as IPerson);


// с помощью instanceof можно проверить принадлежит ли объект определённому классу 

let tom = new Employee("Tom", "Microsoft");
if (tom instanceof Person) {
    console.log("Tom is a Person");
}
else {
    console.log("Tom is not a Person");
}