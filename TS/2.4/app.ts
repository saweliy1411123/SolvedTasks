// обозначение ф-и в JS

function add(a, b) {
    return a + b;
}
// использование функции
let result1 = add(1, 2); // результат 3
let result2 = add("1", "2"); // результат 12

// обозначение ф-и в TS

let koef = 1.5; 
// определение функции
function adds(a: number, b: number){
    let result = a + b * koef; // возможность брать глобальные переменные
    console.log(result);
}
// вызов функции
adds(20, 30); // 50
adds(10, 15); //25
adds("1", "2"); // выдаст ошибку, так как не number


// возвращает number, тип возвращения указывается после параметров через :
function add(a: number, b: number): number {
    return a + b;
}
let result = add(1, 2);
console.log(result);


// если ничего не надо возвращать, то тип void
function add(a: number, b: number): void { 
    console.log(a + b);
}
add(10, 20);

// можно и не указывать тип возвращения, тогда будет основываться на значении возращения
function summar(a: number, b: number) {
    return a + b;
}
console.log(summar(1, 2));

// передаётся ровно столько, сколько указано в параметрах

function getName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
 
let name1 = getName("Иван", "Кузнецов");
let name2 = getName("Иван", "Михайлович", "Кузнецов");  //ошибка, много параметров
let name3 = getName("Иван");  //ошибка, мало параметров

// можно пометить как не обязательные lastName? , но после того как обозначили обязательные
function getNames(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
  
let name1s = getNames("Иван", "Кузнецов");
console.log(name1); // Иван Кузнецов
let name2s = getNames("Вася");
console.log(name2); // Вася

// можно использовать значение по умочанию 
function getName(firstName: string, lastName: string="Иванов") {
     
    return firstName + " " + lastName;
}
 
let name1 = getName("Иван", "Кузнецов");
console.log(name1); // Иван Кузнецов
let name2 = getName("Вася");
console.log(name2); // Вася Иванов


// даже можно передавать результат другой функции
function defaultLastName(): string{
    return "Smith";
}
 
function getName(firstName: string, lastName: string=defaultLastName()) {
     
    return firstName + " " + lastName;
}
 
let name1 = getName("Tom");
console.log(name1); // Tom Smith