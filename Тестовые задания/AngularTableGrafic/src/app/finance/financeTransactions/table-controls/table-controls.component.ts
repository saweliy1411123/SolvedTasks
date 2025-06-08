import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ButtonControlComponent } from '../button-control/button-control.component';
import { CommonModule } from '@angular/common';
import { ButtonConfig } from '../../types/button-config.interface';

@Component({
  selector: 'app-table-controls',
  standalone: true,
  imports: [ButtonControlComponent, CommonModule],
  templateUrl: './table-controls.component.html'
})
export class TableControlsComponent implements OnInit {
  @Input() public isEditDisabled: boolean = true;
  @Input() public modalTarget: string = '';

  @Output() public addClick = new EventEmitter<void>();
  @Output() public editClick = new EventEmitter<void>();
  @Output() public deleteClick = new EventEmitter<void>();

  public buttons: ButtonConfig[] = [];

  ngOnInit(): void {
    this.buttons = [
      {
        buttonText: 'Добавить',
        buttonClass: 'btn-success',
        modalTarget: this.modalTarget,
        modalToggle: true,
        isDisabled: false,
        action: () => this.onAddClick()
      },
      {
        buttonText: 'Редактировать',
        buttonClass: 'btn-primary',
        modalTarget: this.modalTarget,
        modalToggle: true,
        isDisabled: this.isEditDisabled,
        action: () => this.onEditClick()
      },
      {
        buttonText: 'Удалить',
        buttonClass: 'btn-danger',
        modalTarget: '',
        modalToggle: false,
        isDisabled: false,
        action: () => this.onDeleteClick()
      }
    ];
  }

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