// имеет тип void 
// ()=>void;

// function hello (){
//     console.log("Hello TypeScript");
// };



// мы можем определить по типу функции такие же параметры, константы и тд
function hello (){
    console.log("Hello TypeScript");
};
 
const message: ()=>void = hello;
message();



// ф-я "op" представляет функцию которая принимает и возвращает number
function sum (x: number, y: number): number {
    return x + y;
};
function subtract (a: number, b: number): number {
    return a - b;
};
 
let op: (x:number, y:number) => number;
 
op = sum;
console.log(op(2, 4));  // 6
 
op = subtract;
console.log(op(6, 4));  // 2


// тип функции можно использовать как определение типа параметра другой функции
// в "op" будут приниматься ф-и соответствующие параметрам и возвращаемому объекту
function sum (x: number, y: number): number {
    return x + y;
};
function multiply (a: number, b: number): number {
    return a * b;
};
  
function mathOp(x: number, y: number, op: (a: number, b: number) => number): number{
  
    return op(x, y);
}
console.log(mathOp(10, 20, sum)); // 30 
console.log(mathOp(10, 20, multiply)); // 200 


// если предстоит частое использование такой конструкции, её можно сохранить под псевдонимом
type Operation = (a: number, b: number) => number;
 
function mathOp(x: number, y: number, op: Operation): number{
  
    return op(x, y);
}
const sum: Operation = function(x: number, y: number): number {
    return x + y;
};
 
console.log(mathOp(10, 20, sum)); // 30




// стрелочные функции
const sum = (x: number, y: number) => x + y;
// const sum = (x, y) => x + y; можно опускать тип параметров
 
const result = sum(15, 35); // 50
console.log(result);

// если ф-я без параметров, то используются пустые скобки
// если передаётся 1 параметр, можно без скобок

const square = x => x * x;
const hello = () => "hello world"
  
console.log(square(5)); // 25
console.log(hello());   // hello world

// если параметров много, то можно заключить в фигурные скобки
const sum = (x: number, y: number) => {
    x *= 2;
    return x + y;
};
 
const result = sum(15, 35); // 65
console.log(result);

// стрелочные ф-и можно передавать вместо параметра
function mathOp(x: number, y: number, operation: (a: number, b: number) => number): number{
    const result = operation(x, y);
    return result;
}
console.log(mathOp(10, 20, (x, y) => x + y)); // 30 
console.log(mathOp(10, 20, (x, y) => x * y)); // 200 