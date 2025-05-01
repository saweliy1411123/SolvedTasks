// Фабрики декораторов

// Декоратор класса, свойства, метода представляет обычную функцию, которая принимает заданное количество параметров
// что если мы хотим передавать доп. данные, которые могут быть известны только при применении декоратора
// в таком случае можем сконструировать фабрику декораторов 
// эта фабрика представляет ф-ю, которая в свою очередь возвращает ф-ю декоратора


// Определим простейшую

function regex(pattern: string){ // принимает регулярное выражение
    let expression = new RegExp(pattern);
    return function regex(target: Object, propertyName: string){
        let propertyValue = this[propertyName];
 
        // геттер
        var getter = function () {
            return propertyValue;
        };
  
        // сеттер
        // проверка на соответствие нового значения регулярному выражению
        var setter = function (newVal: string) {
            let isValid: boolean = expression.test(newVal); 
            if(isValid === false){
                throw new Error(`Value ${newVal} does not match ${pattern}`);
            }
            else{
                console.log(`${newVal} is valid`);
            }
        };
        // удаляем свойство
        if (delete this[propertyName]) {
     
            // И создаем новое свойство с геттером и сеттером
            Object.defineProperty(target, propertyName, {
                get: getter,
                set: setter
            });
        }
    }
}
class Account{
 
    @regex("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    email: string;
 
    @regex("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
    phone: string;
 
    constructor(email: string, phone: string){
        this.email = email; this.phone = phone;
    }
}
let acc = new Account("bir@gmail.com", "+23451235678");
acc.email = "bir_iki_yedi";