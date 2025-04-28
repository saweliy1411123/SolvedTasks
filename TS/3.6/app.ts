// бывают и статические поля 
// поскольку метод будет общим только для объектов Person
// лучше его сделать статическим 

class Person {
  
    age: number;
    name: string;
     
    static retirementAge: number = 65;
    static calculateYears(age: number): number{
         
        return Person.retirementAge - age;
    }
     
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
 
let tom = new Person("Tom", 36);
let years = Person.calculateYears(36);
console.log(Person.retirementAge);
console.log(`До пенсии осталось: ${years} лет`);

// в статических методах мы можем обращаться только к статическим полям и методам

static calculateYears(): number{
    return Person.retirementAge - this.age; // ! Ошибка - this.age - обращение к нестатическому полю
}

// как и все, они могут иметь модификаторы доступа 
// private static retirementAge: number = 65;

// также они могут наследоваться 

class Employee extends Person {}
 
let years = Employee.calculateYears(36);
console.log(Employee.retirementAge);
