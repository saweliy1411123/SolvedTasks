let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

s = new Intl.Collator();
animals.sort((a, b) => s.compare(a, b));

console.log(animals); // АИСТ,ёж,енот,ехидна,тигр,ЯК
