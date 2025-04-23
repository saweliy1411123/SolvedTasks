// можем применять undefined и null, если strictNullChecks = false, если же true, то будет ошибка
let a: undefined = undefined;
let b: null = null;
let x: number = undefined;
console.log(x);
x = null;
console.log(x);
x = 5;
console.log(x);

// когда мы не знаем конкретное значение переменной 
 
function printId(id: number|null){
    if (id === null) {
        console.log("пользователь отсутствует");
    } else {
        console.log(`id пользователя: ${id}`);
    }
}
printId(userId)     // пользователь отсутствует
userId = 45;
printId(userId);    // id пользователя: 45

// при включённом strictNullChecks мы здесь получим ошибку
const header: HTMLElement|null = document.getElementById("header");
header.innerText = "Hello Typescript!";
// чтобы её избежать мы используем оператор!, который теоретически может принимать null
const header: HTMLElement|null = document.getElementById("header");
header!.innerText = "Hello Typescript!";
// его можно применять к свойствам и методам
object!.property
object!.method()
// если объект имеет значение null, оператор ! не поможет
const header: HTMLElement|null = null;
header!.innerText = "Hello Typescript!";