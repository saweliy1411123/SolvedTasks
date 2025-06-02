import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonControlComponent } from '../button-control/button-control.component';

@Component({
  selector: 'app-table-controls',
  standalone: true,
  imports: [ButtonControlComponent],
  templateUrl: './table-controls.component.html'
})
export class TableControlsComponent {
  @Input() public isEditDisabled: boolean = true;
  @Input() public modalTarget: string = '';

  @Output() public addClick = new EventEmitter<void>();
  @Output() public editClick = new EventEmitter<void>();
  @Output() public deleteClick = new EventEmitter<void>();

  public onAddClick(): void {
    this.addClick.emit();
  }

  public onEditClick(): void {
    this.editClick.emit();
  }

  public onDeleteClick(): void {
    this.deleteClick.emit();
  }
} 