// после определения класса, мы можем создавать объекты
class User {}
let tom: User = new User();
let alice = new User();

// для хранения состояния объекта определяются поля
class User {
    name: string;
    age: number;
}

// по имени объекта мы можем обращаться к их полям
let tom = new User();
tom.name = "Tom";
tom.age = 36;
console.log(`name: ${tom.name}  age: ${tom.age}`);  // name: Tom  age: 36

// также можно задать начальные значения 
class User {
    name: string = "Tom Smith";
    age: number = 18;
}
 
let user = new User();
console.log(`name: ${user.name}  age: ${user.age}`);    // name: Tom Smith  age: 18


// классы могут определять поведения, которое выполняют объекты
// для этого внутри класса определяются функции, которые называются методами (не указывается function)
// для обращения к другим методам и полям класса, используется this
class User {
    name: string;
    age: number;
    print(){
        console.log(`name: ${this.name}  age: ${this.age}`);
    }
    toString(): string{
        return `${this.name}: ${this.age}`;
    }
}
// применение методов
let tom = new User();
tom.name = "Tom";
tom.age = 36;
tom.print();                    // name: Tom  age: 36
 
console.log(tom.toString());    // Tom: 36

// кроме обычных методом, классы имеют конструкторы, выполняющие начальную инициализацию объекта

class User {
  
    name: string;
    age: number;
    constructor(userName: string, userAge: number) {
 
        this.name = userName;
        this.age = userAge;
    }
    print(){
        console.log(`name: ${this.name}  age: ${this.age}`);
    }
}
 
let tom = new User("Tom", 36); // в конструктор передаются значения 
tom.print();        // name: Tom  age: 36

// также можно применять readonly 
// значения полей можно установить в конструкторе или при объявлении
class User {
  
    readonly name: string = "Default user";
    age: number;
    constructor(userName: string, userAge: number) {
 
        this.name = userName;
        this.age = userAge;
    }
    print(){
        console.log(`name: ${this.name}  age: ${this.age}`);
    }
}

// здесь получим ошибку, так как нельзя изменять поле name
let tom = new User("Tom", 36);
tom.name = "Bob";       // ! Ошибка - поле name - только для чтения
tom.print();                    // name: Tom  age: 36