import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() public model: string = '';
  @Output() public modelChange = new EventEmitter<string>();

  public onModelChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.model = input.value;
    this.modelChange.emit(this.model);
  }
} 