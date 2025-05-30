import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-income-date-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income-date-range.component.html'
})
export class IncomeDateRangeComponent {
  public dateFrom: string = '';
  public dateTo: string = '';

  @Output() dateRangeChange = new EventEmitter<{from: string, to: string}>();

  public onDateChange(): void {
    this.dateRangeChange.emit({ from: this.dateFrom, to: this.dateTo });
  }
} 