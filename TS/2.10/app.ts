// преобразование к типу, если мы точно знаем что этот элемент есть

const header = <HTMLElement>document.getElementById("header");
header.innerText = "Hello Typescript!";

// также можно через as
const header = document.getElementById("header") as HTMLElement;
header.innerText = "Hello Typescript!";