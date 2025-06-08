import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-control',
  imports: [],
  templateUrl: './button-control.component.html'
})
export class ButtonControlComponent {
  @Input() buttonText: string = '';
  @Input() buttonClass: string = 'btn-success';
  @Input() modalTarget: string = '';
  @Input() modalToggle: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
