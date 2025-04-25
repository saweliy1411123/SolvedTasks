// массива обозначаются через [], если изначально был какой-то тип, то он с 
// ним и работает 

let list: number[] = [10, 20, 30];
let colors: string[] = ["red", "green", "blue"];
console.log(list[0]);
console.log(colors[1]);

// альтернативный способ обозначения массива 

let names: Array<string> = ["Tom", "Bob", "Alice"];
console.log(names[1]);  // Bob

// массивы позволяют изменять значения своих элементов
const people = ["Tom", "Bob", "Sam"];
people[1] = "Kate";
console.log(people[1]); // Kate

// для того чтобы мы не могли изменять массив можно воспользоваться ReadonlyArray, 
// для этого типа мы не можем принимать конструктор вот так 
const people: ReadonlyArray<string> = new ReadonlyArray("Tom", "Bob", "Sam");

// необходимо передавать значения вот так
const people: ReadonlyArray<string> = ["Tom", "Bob", "Sam"];

// также можно сократить ReadonlyArray до readonly
const people: readonly string[]= ["Tom", "Bob", "Sam"];

// мы не можем поменять или изменять значения его элементов 
const people: ReadonlyArray<string> = ["Tom", "Bob", "Sam"];
people[1] = "Kate";     // ! Ошибка элементы массива ReadonlyArray нельзя изменить 
people.push("Kate");    // ! Ошибка -  нельзя добавить новые элементы
people.pop();           // ! Ошибка -  нельзя удалить существующие элементы

// все остальные операции мы можем делать (которые предусматривают чтение массива)
function printUsers(users: readonly string[]) {
    for(const user of users){
        console.log(user);
    }
}
 
function usersToString(users: ReadonlyArray<string>): String{
     
    return users.join(", ");
}
 
const people: readonly string[]= ["Tom", "Bob", "Sam"];
 
printUsers(people);
console.log(usersToString(people));


// есть поддержка декомпозиции на константы и переменные 
const people: string[]= ["Tom", "Bob", "Sam"];
 
const [first, second, third] = people;
console.log(first);     // Tom
console.log(second);    // Bob
console.log(third);     // Sam

// также можно указать массив в качестве переменной 
const people: string[]= ["Tom", "Bob", "Sam"];
 
const [first, ...rest] = people;
console.log(first);     // Tom
console.log(rest[0]);   // Bob
console.log(rest[1]);       // Sam

// если хотим пропустить элемент, можно вместо него оставить пустое место
const people: string[]= ["Tom", "Bob", "Sam", "Kate"];
 
const [, second, , forth] = people; // пропускаем первый и третий элементы массива
console.log(second);        // Bob
console.log(forth);         // Kate