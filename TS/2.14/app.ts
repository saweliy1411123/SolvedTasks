// для определения перечисления

enum Season { Winter, Spring, Summer, Autumn };
let current: Season = Season.Summer;
console.log(current);       // 2
current = Season.Autumn;    // изменение значения

// фактически эквивалентно 
enum Season { Winter=0, Spring=1, Summer=2, Autumn=3 };

// числа можно переопределить
enum Season { Winter=5, Spring, Summer, Autumn }; // 5, 6, 7, 8

// можно использовать свои обозначения 
enum Season { Winter=4, Spring=8, Summer=16, Autumn=32 };   // 4, 8, 16, 32

// можно получить текстовое значение 
enum Season { Winter=0, Spring=1, Summer=2, Autumn=3 };
var current: string = Season[2];    // 2 - числовое значение Summer
console.log(current);   // Summer


// бывают и строковые перечисления
enum Season { 
    Winter = "Зима", 
    Spring = "Весна",
    Summer = "Лето", 
    Autumn = "Осень"
};
var current: Season = Season.Summer;
console.log(current);   // Лето

// смешанные 
enum Season { 
    Winter = 1, 
    Spring = "Весна",
    Summer = 3, 
    Autumn = "Осень"
};
var current: Season = Season.Summer;
console.log(current);           // 3
console.log(Season.Autumn);     // Осень

// перечисление может быть в качестве параметров
enum DayTime { 
    Morning, 
    Evening
};
function welcome(dayTime: DayTime){
     
    if(dayTime === DayTime.Morning){
        console.log("Доброе утро");
    }
    else{
        console.log("Добрый вечер");
    }
}
let current: DayTime = DayTime.Morning;
welcome(current);           // Доброе утро
welcome(DayTime.Evening);   // Добрый вечер



// можно определить параметр ф-и как числовой и передавать константы числового перечисления 

enum DayTime { 
    Morning, 
    Evening
};
function welcome(dayTime: number){
     
    if(dayTime === DayTime.Morning){
        console.log("Доброе утро");
    }
    else{
        console.log("Добрый вечер");
    }
}
let current: DayTime = DayTime.Morning;
welcome(current);           // Доброе утро
welcome(DayTime.Evening);   // Добрый вечер

// пример параметра строкого перечисления

enum DayTimeMessage { 
    Morning = "Доброе утро", 
    Evening = "Добрый вечер"
};
function welcome(message: DayTimeMessage){
     
    console.log(message);
}
let mes: DayTimeMessage = DayTimeMessage.Morning;
welcome(mes);           // Доброе утро
welcome(DayTimeMessage.Evening);    // Добрый вечер

// когда строковое перечисление мы не можем сделать так
welcome("Привет, ты спишь?") // будет ошибка при компиляции


// но если тип стринг, можно передавать как константы так и переменные строчного типа 
enum DayTimeMessage { 
    Morning = "Доброе утро", 
    Evening = "Добрый вечер"
};
function welcome(message: string){
     
    console.log(message);
}
let mes: DayTimeMessage = DayTimeMessage.Morning;
welcome(mes);           // Доброе утро
welcome(DayTimeMessage.Evening);    // Добрый вечер