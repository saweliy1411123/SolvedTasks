// как и в JS можно наследовать классы с помощью extends
// в наследованном классе (подклассе) можно установить новые свойства и методы,
// которых нет в родительском классе 

class Person {
 
    name: string;
    constructor(userName: string) {
 
        this.name = userName;
    }
    print(): void {
        console.log(`Имя: ${this.name}`);
    }
}

class Employee extends Person {
    // расширение функциональности
    company: string;
    work(): void {
        console.log(`${this.name} работает в компании ${this.company}`);
    }
}

let bob: Employee = new Employee("Bob");
bob.print();
bob.company = "Microsoft";
bob.work();



// если подкласс определяет свой конструктор, то он должен вызвать 
// конструктор базового класса с помощью super

class Person {
 
    name: string;
    constructor(userName: string) {
 
        this.name = userName;
    }
    print(): void {
        console.log(`Имя: ${this.name}`);
    }
}
 
class Employee extends Person {
 
    company: string;
    constructor(name: string, company: string) {
   
        super(name);
        this.company = company;
    }
    work(): void {
        console.log(`${this.name} работает в компании ${this.company}`);
    }
}
 
let bob: Employee = new Employee("Bob", "Microsoft");
bob.work();     // Bob работает в компании Microsoft


// если даже в родительском классе не определяется конструктор,
// то в дочернем при определении конструктора, всё равно надо вызвать super()
class Person {
    name: string;
}
 
class Employee extends Person {
 
    company: string;
    constructor(name: string, company: string) {
   
        super();    // вызов конструктора базового класса
        this.name = name;
        this.company = company;
    }
    work(): void {
        console.log(`${this.name} работает в компании ${this.company}`);
    }
}
 
let bob: Employee = new Employee("Bob", "Microsoft");
bob.work();     // Bob работает в компании Microsoft

// также дочерние классы могут переопределять методы родительских классов

class Person {
   
    name: string;
    constructor(name: string) {
   
        this.name = name;
    }
    print(): void {
        console.log(`Имя: ${this.name}`);
    }
}
   
class Employee extends Person {
   
    company: string;
    constructor(name: string, company: string) {
   
        super(name);
        this.company = company;
    }
    print(): void {
        console.log(`Имя: ${this.name}`);
        console.log(`Работает в компании: ${this.company}`);
    }
}
 
let bob: Employee = new Employee("Bob", "Microsoft");
bob.print();

// и вместо дублирования кода, можно вызвать super 

class Person {
   
    name: string;
    constructor(name: string) {
   
        this.name = name;
    }
    print(): void {
        console.log(`Имя: ${this.name}`);
    }
}
   
class Employee extends Person {
   
    company: string;
    constructor(name: string, company: string) {
   
        super(name);
        this.company = company;
    }
    print(): void {
        super.print();
        console.log(`Работает в компании: ${this.company}`);
    }
}
 
let bob: Employee = new Employee("Bob", "Microsoft");
bob.print();