import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-title',
  templateUrl: './column-title.component.html'
})
export class ColumnTitleComponent {
  @Input() title: string = '';
} 