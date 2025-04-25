// можно определять псевдоним типов 
type id = number | string;
 
let userId : id = 2;
console.log(`Id: ${userId}`);
userId = "qwerty";
console.log(`Id: ${userId}`);

// псевдоним можно применять в виде типа параметра и как результат функции 
type id = number | string;
function printId(inputId: id){
    console.log(`Id: ${inputId}`);
}
function getId(isNumber:boolean): id{
    if(isNumber)
        return 1;
    else
        return "1";
}
printId(12345);
printId("qwerty");
console.log(getId(true));

// полезно при работе с сложными объектами
type Person = {name: string; age: number};
 
let tom: Person = {name: "Tom", age: 36};
let bob: Person = {name: "Bob", age: 41};
 
function printPerson(user: Person){
    console.log(`Name: ${user.name}  Age: ${user.age}`);
}
 
printPerson(tom);
printPerson(bob);


// псевдонимы могут расширяться с помощью оператора & 
type Person = {name: string; age: number};
type Employee = Person & {company: string};
// type Employee = {name: string; age: number; company: string};


// применение аналогично применению обычных псевдонимов 

type Person = {name: string; age: number};
// расширяем псевдоним Person
type Employee = Person & {company: string};
 
let tom: Person = {name: "Tom", age: 36};
let bob: Employee = {name: "Bob", age: 41, company: "Microsoft"};
 
function printPerson(user: Person){
    console.log(`Name: ${user.name}  Age: ${user.age}`);
}
 
printPerson(tom);
printPerson(bob);  // bob представляет Employee, но он также соответствует псевдониму Person