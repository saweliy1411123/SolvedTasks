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

// если же мы обратимся к этому свойству (которого нет), мы получим undefined

let person: { name: string; age?: number } = { name: "Tom", age: 23 };
 
console.log(person.age);    // 23
person = { name: "Bob"};
console.log(person.age);    // undefined

// поэтому можно проверять на undefined 
let person: { name: string; age?: number } = { name: "Tom", age: 36};
if (person.age !== undefined) {
     
    console.log(person.age);
}

// функция может принимать объекты как параметры, и возвращать их 

function printUser(user: { name: string; age: number}) {
    console.log(`name: ${user.name}  age: ${user.age}`);
  }
  let tom = {age: 36, name: "Tom"};
   
  printUser(tom);

  // объект может содержать больше свойств, но при этом он должен содержать
  // те свойства описанные в параметрах

  function printUser(user: { name: string; age: number}) {
    console.log(`name: ${user.name}  age: ${user.age}`);
  }
  let bob = {name: "Bob", age: 44, isMarried: true};
  printUser(bob);


  // также объект, может быть результатом функции

  function defaultUser(): { name: string; age: number} {
   
    return {name: "Tom", age: 37};
  }
   
  let user = defaultUser();
  console.log(`name: ${user.name}  age: ${user.age}`);


// также можно проверить на наличие свойства с помощью оператора in 

let tom: { name: string; age?: number } = { name: "Tom", age: 23 };
let bob: { name: string; age?: number } = { name: "Bob"};
 
 
function printUser(user: { name: string; age?: number }){
 
    if("age" in user){ // название свойства передаётся как строка 
        console.log(`Name: ${user.name} Age: ${user.age}`);
    }
    else{
        console.log(`Name: ${user.name}`);
    }
}
printUser(tom);
printUser(bob);


// если функция принимает объект в качестве параметра, то оно автоматически раскладывается на свойства
function printUser({name, age}: { name: string; age: number}) {
    console.log(`name: ${name}  age: ${age}`);
  }
   
  let tom = {name: "Tom", age: 36};
  printUser(tom);


  // также они могут принимать значения по умолчанию age = 25

  function printUser({name, age = 25}: { name: string; age?: number}) {
    console.log(`name: ${name}  age: ${age}`);
  }
   
  let tom = {name: "Tom"};
  printUser(tom);     // name: Tom  age: 25
   
  let bob = {name: "Bob", age: 44};
  printUser(bob);     // name: Bob  age: 44