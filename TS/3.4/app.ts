// в TS есть 3 модификатора 
// public, private, protected


// если к свойствам не применяется модификатор, то используется public 

class Person {
    name: string;
    year: number;
    // тоже самое что и:
    // public name: string;
    // public year: number;
}



// к приватным нельзя обращатся извне

class Person {
      
    private _name: string;
    private _year: number;
  
    constructor(name: string, age: number) {
  
        this._name = name;
        this._year = this.setYear(age);
    }
    public print(): void {
        console.log(`Имя: ${this._name}  Год рождения: ${this._year}`);
    }
  
    private setYear(age: number): number {
  
        return new Date().getFullYear() - age;
    }
}
  
let tom = new Person("Tom", 24);
tom.print();
// console.log(tom._name); // нельзя обратиться, так как _name - private
// tom.setYear(45); // нельзя обратиться, так как функция - private


// при модификаторе protected видны только у наследников 
class Person {
    protected name: string;
    private year: number;
    constructor(name: string, age: number) {
  
        this.name = name;
        this.year = this.setYear(age);
    }
    protected printPerson(): void {
 
        console.log(`Имя: ${this.name}  Год рождения: ${this.year}`);
    }
    private setYear(age: number): number {
  
        return new Date().getFullYear() - age;
    }
}
class Employee extends Person {
 
    protected company: string;
    constructor(name: string, age: number, company: string) {
        super(name, age);
        this.company = company;
    }
    public printEmployee(): void {
        //console.log("Year: " + this.year);    // поле year недоступно, так как private
        // setYear(25);                         // метод setYear недоступен, так как private
        this.printPerson();                     // метод printPerson доступен, так как protected
        console.log(`Компания: ${this.company}`);
    }
}
 
let sam = new Employee("Sam", 31, "Microsoft");
sam.printEmployee();


// можно сократить код 
class Person {
     
    private name: string;
    private age: number;
 
    constructor(name: string, age: number) {
 
        this.name = name;
        this.age = age;
    }
    printPerson(): void {
 
        console.log(`Имя: ${this.name}  Возраст: ${this.age}`);
    }
}
// что эквивалентно 
// свойства создаются автоматически, называются они по имени параметров
// и имеют те же модификаторы что и параметры
class Person{
    constructor(private name: string, private age: string){};
    printPerson(): void {
        console.log(`Имя: ${this.name}  Возраст: ${this.age}`)
    }
}

// также работает и с публичными 
class Person {
    constructor(public name: string, public age: number) {  }
    printPerson(): void {
        console.log(`Имя: ${this.name}  Возраст: ${this.age}`);
    }
}

// также можно дописать readonly, если нужно чтобы было доступно только для чтения
class Person {
    constructor(private readonly name: string, private age: number) {  }
}