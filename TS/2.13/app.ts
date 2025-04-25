// можно использовать в качестве параметра массив в виде точек, 
// если используются однотипные параметры
function addNumbers(firstNumber: number, ...numberArray: number[]): number {
      
    let result = firstNumber;
    for (let i = 0; i < numberArray.length; i++) {
        result+= numberArray[i];
    }
    return result;
}
  
let num1 = addNumbers(3, 7, 8);
console.log(num1); // 18
  
let num2 = addNumbers(3, 7, 8, 9, 4);
console.log(num2); // 31


// позволяют использовать массивы для передачи данных сразу несколькими параметрами
function sum(...args: number[]): number {
       
    let result = 0;
    for (let i = 0; i < args.length; i++) {
        result+= args[i];
    }
    return result;
}
const numbers = [1, 3, 5, 7, 9] as const;
let num = sum(...numbers);
console.log(num); // 25

// для фиксированных параметров

function sum(a: number, b: number): number {
       
    return a + b;
}
const numbers = [1, 3, 5, 7, 9] as const;
let num = sum(...numbers);  // ! Ошибка - функция sum принимает только два параметра
console.log(num); // 25


// могут быть неопределённые переменные в параметрах

function sum(a: number, b: number, c?: number): number {
      
    let result = a + b;
    if(c!==undefined) { result +=c;}
    return result;
}
const numbers1 = [1, 3] as const;
let num1 = sum(...numbers1);    // a = 1  b = 3
console.log(num1); // 4
 
const numbers2 = [1, 3, 7] as const;
let num2 = sum(...numbers2);    // a = 1  b = 3  c = 7
console.log(num2); // 11


// передавать значения разныъ типов в виде кортежа

function printValues(name: string, age: number){
      
    console.log(name);
    console.log(age);
}
const values = ["Tom", 36] as const;
printValues(...values); // name = "Tom", age = 36

// вот так будет ошибка так как первый тип должен быть string, а второй number
const values = [36, "Tom"] as const;
printValues(...values);