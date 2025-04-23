// var x = "hello"; 
// console.log(x);
// var x = "work";
// console.log(x);


// let x = "hello"; 
// console.log(x);
// let x = "work"; // будет ошибка даже есть var x
// console.log(x);

let z = 6;
z = 8;

// const z = 6;
// z = 8; // нельзя изменять константу


// разная область видимости
let x = 10;
{
    let x = 25;
    {
        let x = 163;
        console.log(x); // будет вывод 163
    }
    console.log(x); // будет вывод 25
}
console.log(x); // 10 будет вывод 

// Различия между var, let и const

// var 
{
    var u = 94;
}
console.log(u); // норм
// можно использовать перед определением
console.log(i); // undefined, но норм
var i = 76;
// можно несколько раз переопределить перем. с тем же именем
var s = 72;
console.log(s); // 72
var s = 24;     // норм
console.log(s); // 24


// let и const 
// дотупны только в рамках области видимости
{
    let x = 94;
}
console.log(x); // ! Ошибка
// использовать только после определения
console.log(m); // ! Ошибка
let m = 76;
// можно только один раз определить переменную с тем же именем
let j = 10;
console.log(j); // вывод 10
let j = 2; // ошибка 
console.log(j);