import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-control',
  imports: [],
  templateUrl: './button-control.component.html',
  styleUrl: './button-control.component.scss'
})
export class ButtonControlComponent {
  @Input() buttonText: string = '';
  @Input() buttonClass: string = 'btn-success';
  @Input() modalTarget: string = '';
  @Input() modalToggle: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() dataBsDismiss: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
