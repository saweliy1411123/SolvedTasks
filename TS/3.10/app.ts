// так можно унаследовать сразу от двух классов
// пример того что лошадь является транспортом и животным одновременно 

class Animal {
  
    feed():void {
        console.log("Кормим животное");
    }
}
  
class Movable {
  
    speed: number=0;
    move(): void {
        console.log("Перемещаемся");
    }
}
  
class Horse {}
 
// для того чтобы унаследовал методы, но этого не достаточно, есть ф-я ниже копирующая ф-онал
interface Horse extends Animal, Movable {}

// функция которая перекопирует ф-онал из родительских классов в миксин (horse - гибрид классов)
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

// Первым параметром идет класс-миксин, а второй параметр - массив применяемых классов.
applyMixins(Horse, [Animal, Movable]);
  
let pony: Horse = new Horse();
pony.feed();
pony.move();