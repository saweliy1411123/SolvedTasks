// также можно создавать сложные комплексные объекты
let person = {name:"Tom", age:23};
console.log(person.name);
// альтернативный вариант получения свойства
console.log(person["name"]);

// будет ошибка, так как будет предпологаться, что в объекте 2 свойства
let person = { name: "Tom", age: 23 };
person = { name: "Bob" };           // ! Ошибка

//также мы можем записать в таком формате
let person: { name: string; age: number } = { name: "Tom", age: 23 };
console.log(person.name);

// в таком случае ошибок не будет 
let person = { name: "Tom", age: 23 };
person = { name: "Bob", age: 35 };      // Норм

// можно указать необязательные свойства с оператором ?
let person: { name: string; age?: number }; // Свойство age - необязательное

// поэтому можно не указывать age и всё будет работать
person = { name: "Tom", age: 23 };
console.log(person.name);   // Tom
person = { name: "Bob"};    // Норм, свойство age - необязательное
console.log(person.name);   // Bob