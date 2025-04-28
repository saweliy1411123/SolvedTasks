// абстрактные классы
// мы не можем создать объект используя его конструктор
abstract class Figure {
}
 
// let someFigure = new Figure()    // Ошибка!


// в абстрактном классе мы создаём общий функционал, который будет распространятся на 
// дочерние классы 
abstract class Figure {
    getArea(): void{
        console.log("Not Implemented")
    }
}
class Rectangle extends Figure{
     
    constructor(public width: number, public height: number){ 
        super();
    }
     
    getArea(): void{
        let square = this.width * this.height;
        console.log("area =", square);
    }
}
 
let someFigure: Figure = new Rectangle(20, 30)
someFigure.getArea();   // area = 600


// так как getArea не выполняет никакой фукнциональности
// его можно определить как abstract 
// при наследовании дочерние классы должны реализовать все методы,
// которые были асбстрактны в родительском
abstract class Figure {
    abstract getArea(): void;
}
class Rectangle extends Figure{
     
    constructor(public width: number, public height: number){ 
        super();
    }
     
    getArea(): void{
        let square = this.width * this.height;
        console.log("area =", square);
    }
}
 
let someFigure: Figure = new Rectangle(20, 30)
someFigure.getArea();


// абстрактный класс может иметь абстрактные поля 
// при наследовании, обязательно их надо реализовать

abstract class Figure {
    abstract x: number;
    abstract y: number;
    abstract getArea(): void;
}
class Rectangle extends Figure{
    //x: number;
    //y: number;
     
    constructor(public x: number, public y: number, public width: number, public height: number){ 
        super();
    }
     
    getArea(): void{
        let square = this.width * this.height;
        console.log("area =", square);
    }
}
 
let someFigure: Figure = new Rectangle(10, 10, 20, 25)
someFigure.getArea();