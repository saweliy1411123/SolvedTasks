// Директива NgForm

// при работе с формами все элементы помещаются в стандартный элемент <form></form>
// в Ангуляр для работы с формой определена спец директива NgForm/
// Она создаёт объект FormGroup и привязывает его к форме, позволяет управлять и отслеживать форму

<form #myForm="ngForm">


// Определим следующий компонент
import { Component} from "@angular/core";
import { FormsModule, NgForm} from "@angular/forms"; // импортируем
 
class User{
    constructor(public name: string,
        public email: string,
        public phone: string){}
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    styles: ` 
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    // через переменную ngForm можем ссылаться на всю форму
    // novalidate - отключает отображение встроенных в браузер сообщений об ошибках валидации
    template: `<form #myForm="ngForm" novalidate>
                    <p>
                        <label>Имя</label><br>
                        <input name="name" [(ngModel)]="name" required />
                    </p>
                    <p>
                        <label>Email</label><br>
                        <input name="email" ngModel 
                            required email />
                    </p>
                    <p>
                        <label>Телефон</label><br>
                        <input name="phone" ngModel 
                            required pattern="[0-9]{10}" />
                    </p>
                    <button [disabled]="myForm.invalid" (click)="submit(myForm)">Добавить</button>
                </form>
                <p>Имя: {{myForm.value.name}}</p>
                <p>Email: {{myForm.value.email}}</p>`
})
export class AppComponent { 
  
    name: string = "";
    email: string = "";
    phone: string = "";
    
    // можно при нажатии на кнопку получить всю форму и её значения
    submit(form: NgForm){
        console.log(form);
    }
}

// для отслеживания состояние ангуляр добавляет пару классов 

<form class="ng-pristine ng-untouched ng-valid" novalidate="">

// директива ngModel просто указывает, что поле ввода будет включаться в объект myForm

// через свойства controls мы можем обратиться к элементам формы к которым применена ngModel
// значения элементов соответствуют значениям атрибутов name у полей ввода 

// для получения введённых значений мы можем использовать value
<p>Имя: {{myForm.value.name}}</p>
<p>Email: {{myForm.value.email}}</p>


// Отправка формы

// в ангуляр мы можем использовать событие ngSubmit, которое генерируется при нажатии на кнопку отправки
import { Component} from "@angular/core";
import { FormsModule, NgForm} from "@angular/forms";
 
class User{
    constructor(public name: string,
        public email: string,
        public phone: string){}
}
  
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule],
    styles: ` 
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    template: `<form  #myForm="ngForm" novalidate (ngSubmit)="onSubmit(myForm)">
                    <p>
                        <label>Имя</label><br>
                        <input name="name" ngModel required />
                    </p>
                    <p>
                        <label>Email</label><br>
                        <input name="email" ngModel 
                            required email />
                    </p>
                    <p>
                        <label>Телефон</label><br>
                        <input name="phone" ngModel 
                            required pattern="[0-9]{10}" />
                    </p>
                    <input type="submit" [disabled]="myForm.invalid" value="Отправить" />
                </form>`
})
export class AppComponent { 
  
    name: string = "";
    email: string = "";
    phone: string = "";
      
    onSubmit(form: NgForm){
        console.log(form);
    }
}