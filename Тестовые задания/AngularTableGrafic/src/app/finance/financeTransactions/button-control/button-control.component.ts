import { Component, Input, Output, EventEmitter } from '@angular/core';

interface TableRow {
  id: string;
  category: string;
  sum: string;
  data: string;
}

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
  @Input() dataBsDismiss: string = '';
  @Output() buttonClick = new EventEmitter<void>();
  @Output() editData = new EventEmitter<void>();

  onClick() {
    this.buttonClick.emit();
  }
}
