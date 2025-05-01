// Декораторы свойств и методов доступа

// Декоратор свойства представляет функцию, которая принимает два параметра
// 1 - конструктор класса, если свойство статическое, либо прототип класса, если свойство нестатическое
// 2 - имя свойства
function MyPropertyDecorator(target: Object, propertyKey: string){
    // код декоратора
}

// Определим простейший декоратор для свойства
function format() {
    return function(target: Object, propertyKey: string) { 
      let value : string;
      const getter = function() {
        return "Mr./Ms." + value;     // изменяем возвращаемое значение
      };
      const setter = function(newVal: string) {
         if(newVal.length > 2) {   // добавляем проверку на длину строки
            value = newVal
        }     
      }; 
      // устанавливает геттер и сеттер для свойства
      Object.defineProperty(target, propertyKey, {    
        get: getter,
        set: setter
      });
    }
  }
   
  class User {
    
      @format()
      name: string;
      constructor(name: string){
          this.name = name;
      }
      print():void{
          console.log(this.name);
      }
  }
  let tom = new User("Tom");
  tom.print();
  tom.name = "Tommy";
  tom.print();
  tom.name = "To";
  tom.print();

// Вывод в консоли
// Mr./Ms.Tom
// Mr./Ms.Tommy
// Mr./Ms.Tommy



// Декораторы метода доступа, принимает 3 параметра
// 1 - конструктор класса ....
// 2 - название метода, 3 - объект PropertyDescriptor
function decorator(target: Object, propertyName: string, descriptor: PropertyDescriptor){ 
    // код декоратора
}

// Определим простейший декоратор метода доступа:

function validator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldSet = descriptor.set; // переопределяет поведение сеттера
  
    descriptor.set = function(value: string) {
        if (value === "admin") {
            throw new Error("Invalid value");
        }
        if(oldSet!==undefined) oldSet.call(this, value);
    }
}
class User {
  
    private _name: string;
    constructor(name: string){
        this.name = name;
    }
      
    public get name(): string {
        return this._name;
    }
    @validator
    public set name(n: string) {
        this._name = n;
    }
}
let tom = new User("Tom");
console.log(tom.name);
tom.name= "admin";
console.log(tom.name);