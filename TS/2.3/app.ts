let y: number = 10; 
let hello: string = "hello world";
let isValid: boolean = true;


// boolean
let isEnabled: boolean = true;
let isAlive: boolean = false;
console.log(isEnabled);
console.log(isAlive);

// number
let age: number = 36;
let height: number = 1.68;
let decimal: number = 6;
// шестнадцатиричная система
let hex: number = 0xf00d;       // 61453 в десятичной
// двоичная система
let binary: number = 0b1010;    // 10 в десятичной
// восьмиричная система
let octal: number = 0o744;      // 484 в десятичной
console.log(decimal);
console.log(hex);
console.log(binary);
console.log(octal);


// string
let firstName: string = "Tom";
let lastName = 'Johns';

// `` - кавычки

let firstNames: string = "Tom";
let ages: number = 28;
let info: string = `Имя ${firstNames}    Возраст: ${ages}`;
console.log(info);  // Имя Tom    Возраст: 28

// многострочный текст
let sentence: string = `Hello World!
Goob bye World!`;

// bitint 2 способа 
// необходимо установить es2020

const num1: bigint = BigInt(100);
console.log(num1);

const num2: bigint = 100n;
console.log(num2);

// можно и не указывать тип
let hellos = "hello world";
hellos = 23;

// any

let someVar: any = "hello";
console.log(someVar);   // сейчас someVar - это string
someVar = 20; 
console.log(someVar);   // сейчас someVar - это number

// массивы any

var someArray: any[] = [ 24, "Tom", false];

// если не указать присваивается тип any
let x;  // тип any
x = 10; 
x = "hello";

let sum: any;
sum = 1200;
sum = "тысяча двести";
let result: number = sum / 12;
console.log(result); // NaN - строку нельзя разделить на число

// typeof 
let sum: any;
sum = 1200;
 
if (typeof sum === "number") {
     
    let result: number = sum / 12;
    console.log(result);
}
else{
    console.log("invalid operation");
}