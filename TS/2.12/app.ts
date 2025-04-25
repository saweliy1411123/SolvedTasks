// вот так мы можем определять кортеж 
// определение кортежа - кортеж состоит из двух элементов - строки и числа

let user: [string, number];

// для присвоения значения применяется массив
user = ["Tom", 28];
//userInfo = [28, "Tom"]; // Ошибка, значения должны соответсвовать типу элемента на его месте

// для обращения к элементам массива используют индексы

let user: [string, number] = ["Tom", 36];
console.log(user[1]); // 36
user[1] = 37;
console.log(user[1]); // 37

// с помощью for можно перебрать элементы кортежа

let user: [string, number] = ["Tom", 36];
for(const prop of user){
    console.log(prop);
}

// кортеж как параметр функции 
function printUser(user: [string, number]) {
    console.log(user[0]);
    console.log(user[1]);
}
let tom: [string, number] = ["Tom", 36];
printUser(tom);

// кортеж как результат функции

function createUser(name: string, age: number) : [string, number]{
     
    return [name, age];
}
let user = createUser("Bob", 41);
console.log(user[0]);
console.log(user[1]);


// кортежи могут иметь необязательные элементы, которые должны идти после обязательных
let bob: [string, number, boolean?] = ["Bob", 41, true];
let tom: [string, number, boolean?] = ["Tom", 36];


// кортеж с необязательными элементами в параметре

function printUser(user: [string, number, boolean?]) {
 
    if(user[2]!==undefined){
        console.log(`name: ${user[0]}  age: ${user[1]}  isMarried: ${user[2]}`);
    }
    else{
        console.log(`name: ${user[0]}  age: ${user[1]}`);
    }
}
 
let bob: [string, number, boolean] = ["Bob", 41, true];
let tom: [string, number] = ["Tom", 36];
 
printUser(bob);
printUser(tom);

// в кортеже можно определить набор элементов, кол-во которых не определено 
let math: [string, ...number[]] = ["Math", 5, 4, 5, 4, 4];
let physics: [string, ...number[]] = ["Physics", 5, 5, 5];

// функция с неопределённым кол-вом элементов в качестве параметра
function printMarks(marks: [string, ...number[]]){
     
    for(const mark of marks){
        console.log(mark);
    }
}
let math: [string, ...number[]] = ["Math", 5, 4, 5, 4, 4];
let physics: [string, ...number[]] = ["Physics", 5, 5, 5];
 
printMarks(math);
printMarks(physics);

// нкэ можно определять хоть где в начале/середине/конце
let math: [string, ...number[]] = ["Math", 5, 4, 5, 4, 4];
let physics: [...number[], string] = [5, 5, 5, "Physics"];
let chemistry: [string, ...number[], boolean] = ["Chemistry", 3, 3, 4, 5, false];


// кортежи также можно сделать только для чтения 
const tom: readonly [string, number] = ["Tom", 36]; 
tom[1] = 37; // ! Ошибка - элементы кортежа для чтения нельзя изменять

// котреж для чтения в качестве параметра 

function printUser(user: readonly [string, number]) {
 
    console.log(`name: ${user[0]}  age: ${user[1]}`);
}

// кортеж для чтения в качестве результата

function generateUser(): readonly [string, number]{
 
    return ["Sam", 18];
}

// кортеж как и массив можно раскладывать на переменные и константы

let tom: [string, number, boolean] = ["Tom", 36, false];
let [username, userage, isMarried] = tom;   // декомпозиция
console.log(username);      // Tom
console.log(userage);       // 36
console.log(isMarried);     // false


// также можно указать кортеж, в который будут помещаться остальные элементы

let tom: [string, number, boolean] = ["Tom", 36, false];
const [username, ...rest] = tom;
console.log(username);      // Tom
console.log(rest[0]);       // 36
console.log(rest[1]);       // false


// можем поместить меньше переменных, констант чем элементов в кортеже игнорируя их 

let tom: [string, number, boolean] = ["Tom", 36, false];
const [username, userage] = tom;
console.log(username);      // Tom
console.log(userage);       // 36

// также и с пустым местом 

let tom: [string, number, boolean, number] = ["Tom", 36, false, 170];
const [, age, , height] = tom;      // пропускаем первый и третий элементы
console.log(age);           // 36
console.log(height);        // 170