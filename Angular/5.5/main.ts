// Reactive Forms 

// для этой формы создаётся набор объектов:
// FormGroup - форма и подсекции
// FormControl - отдельные эдементы вввода


// добавление в форму элементы 
myForm : FormGroup = new FormGroup();

myForm : FormGroup = new FormGroup({
             
    "userName": new FormControl(),
    "userEmail": new FormControl(),
    "userPhone": new FormControl()
});

// объект FormControl может иметь различные формы опредления
// в качестве первого параметра можно передавать значение по умолчанию 
// для второго параметра - набор валидаторов


myForm : FormGroup = new FormGroup({
             
    "userName": new FormControl("Tom", Validators.required),
    "userEmail": new FormControl("", [
                Validators.required, 
                Validators.email
    ]),
    "userPhone": new FormControl("", Validators.pattern("[0-9]{10}")) 
});

// Validators.required - требует обязательного наличия значения 
// Validators.email - проверяет на электронный адрес
// Validators.pattern("[0-9]{10}") - проверяет на соответствие регулярному выражению


// для привязки объекта myForm к конкретному элементу формы применяется атрибут formGroup
<form [formGroup]="myForm" >

// также необходимо связать объекты FormControl с элементами ввода с помощью аттрибута formControlName
// Данный элемент будет связан с объектом "userName": new FormControl("Tom").
<input name="name" formControlName="userName" />



// теперь рассмотрим взаимодействие с шаблоном компонента

import { Component} from "@angular/core";
// импортирование модуля ReactiveFormsModule
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";
 
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule], // тут тоже импорт
    styles: ` 
        div {margin: 5px 0;}
        .alert {color:red;}
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    template: `<form [formGroup]="myForm" novalidate (ngSubmit)="submit()">
                    <div>
                        <label>Имя</label><br>
                        <input name="name"   formControlName="userName" />
 
                        @if(myForm.controls["userName"].invalid && myForm.controls["userName"].touched){
                            <div class="alert">Не указано имя</div>
                        }
                    </div>
                    <div>
                        <label>Email</label><br>
                        <input name="email" formControlName="userEmail" />
 
                        @if(myForm.controls["userEmail"].invalid && myForm.controls["userEmail"].touched){
                            <div class="alert">Некорректный email</div>
                        }
                    </div>
                    <div>
                        <label>Телефон</label><br>
                        <input name="phone" formControlName="userPhone" />
 
                        @if(myForm.controls["userPhone"].invalid && myForm.controls["userPhone"].touched){
                            <div class="alert">Некорректный номер телефона</div>
                        }
                    </div>
                    <button [disabled]="myForm.invalid">Отправить </button>
                </form>`
})
export class AppComponent { 
    
    myForm : FormGroup;
    constructor(){
        this.myForm = new FormGroup({
               
            "userName": new FormControl("Tom", Validators.required),
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email 
                            ]),
            "userPhone": new FormControl("", Validators.pattern("[0-9]{11}")) 
        });
    }
       
    submit(){
        console.log(this.myForm);
    }
}

// С помощью выражений myForm.controls['userName'] мы можем обратиться к нужному элементу формы и получить его состояние или значение.




// Определение валидаторов
// мы можем определять свои

// Например
export class AppComponent { 
  
    myForm : FormGroup;
    constructor(){
        this.myForm = new FormGroup({
             
            "userName": new FormControl("Tom", [Validators.required, this.userNameValidator]),
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email
                            ]),
            "userPhone": new FormControl()
        });
    }
    submit(){
        console.log(this.myForm);
    }
    // валидатор
    // в качестве параметра он принимает элемент формы, на выходе объект, где ключ - строка, а значение равно true
    userNameValidator(control: FormControl): {[s:string]:boolean}|null{
        //  в случае "нет" то данное поле не пройдёт валидацию
        if(control.value==="нет"){
            return {"userName": true};
        }
        return null;
    }
}


// Массивы элементов и FormArray
// некоторые элементы на форме могут относится к одному и тому же признаку
// для этого можно определить данные в массив, с помощью FormArray



import { Component} from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
 
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    styles: ` 
        div {margin: 5px 0;}
        .alert {color:red;}
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    template: `<form [formGroup]="myForm" novalidate (ngSubmit)="submit()">
                    <div>
                        <label>Имя</label><br>
                        <input name="name"  formControlName="userName" />
 
                        @if(myForm.controls["userName"].invalid && myForm.controls["userName"].touched){
                            <div class="alert">Не указано имя</div>
                        }
                    </div>
                    <div>
                        <label>Email</label><br>
                        <input name="email" formControlName="userEmail" />
 
                        @if(myForm.controls["userEmail"].invalid && myForm.controls["userEmail"].touched){
                            <div class="alert">Некорректный email</div>
                        }
                    </div>
// контейнер всех элементов ввода имеет директиву formArrayName="phones"
                    <div formArrayName="phones">
// делаем вывод с помощью for из FormArray
                    @for(phone of getFormsControls()["controls"]; track $index){
                        <div>
                            <label>Телефон</label><br>
// а каждый элемент в качестве названия принимает его текущий индекс
                            <input formControlName="{{$index}}" />
                        </div>
                    }
                    </div>
// эта кнопка позволяет добавить новую форму для ещё одного телефонного номера
                    <button (click)="addPhone()">Добавить телефон</button>
                    <button [disabled]="myForm.invalid">Отправить</button>
                </form>`
})
export class AppComponent { 
   
    myForm : FormGroup;
    constructor(){
        this.myForm = new FormGroup({
              
            "userName": new FormControl("Tom", [Validators.required]),
            "userEmail": new FormControl("", [
                                Validators.required, 
                                Validators.email 
                            ]),
            // теперь поля для ввода телефонных номеров представляют массив
            "phones": new FormArray([
                new FormControl("+7", Validators.required)
            ])
        });
    }
    // для упрощения получения массива элементов, который возвразает FormArray
    getFormsControls() : FormArray{
        return this.myForm.controls["phones"] as FormArray;
    }
    // чтобы можно было динамически при необходимости добавлять новые объекты
    // получаем объект формы, через выражение this.myForm.controls["phones"]
    // затем приводим к типу FormArray, потом добавляем через push
    addPhone(){
        (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", Validators.required));
    }
    submit(){
        console.log(this.myForm);
    }
}


// FormBuilder 
// альтернативный подход к созданию форм



// FormBuilder передаётся в качестве сервиса в конструктор
// с помощью метода group() создается объект FormGroup
// каждый элемент передаётся в форму в виде обычного массива значений 
// "userName": ["Tom", [Validators.required]]
import { Component} from "@angular/core";
import { FormsModule, ReactiveFormsModule, FormGroup, 
        FormControl, Validators, FormArray, FormBuilder} from "@angular/forms";
 
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    styles: ` 
        div {margin: 5px 0;}
        .alert {color:red;}
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `,
    template: `<form [formGroup]="myForm" novalidate (ngSubmit)="submit()">
                    <div>
                        <label>Имя</label><br>
                        <input name="name"  formControlName="userName" />
 
                        @if(myForm.controls["userName"].invalid && myForm.controls["userName"].touched){
                            <div class="alert">Не указано имя</div>
                        }
                    </div>
                    <div>
                        <label>Email</label><br>
                        <input name="email" formControlName="userEmail" />
 
                        @if(myForm.controls["userEmail"].invalid && myForm.controls["userEmail"].touched){
                            <div class="alert">Некорректный email</div>
                        }
                    </div>
                    <div formArrayName="phones">
                    @for(phone of getFormsControls()["controls"]; track $index){
                        <div>
                            <label>Телефон</label><br>
                            <input formControlName="{{$index}}" />
                        </div>
                    }
                    </div>
                    <button (click)="addPhone()">Добавить телефон</button>
                    <button [disabled]="myForm.invalid">Отправить</button>
                </form>`
})
export class AppComponent { 
    
    myForm : FormGroup;
    constructor(private formBuilder: FormBuilder){
       
        this.myForm = formBuilder.group({
               
            "userName": ["Tom", [Validators.required]],
            "userEmail": ["", [ Validators.required, Validators.email]],
            "phones": formBuilder.array([
                ["+7", Validators.required]
            ])
        });
    }
    getFormsControls() : FormArray{
        return this.myForm.controls["phones"] as FormArray;
    }
    addPhone(){
        (<FormArray>this.myForm.controls["phones"]).push(new FormControl("+7", Validators.required));
    }
    submit(){
        console.log(this.myForm);
    }
}

