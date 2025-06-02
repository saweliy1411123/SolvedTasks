import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange } from '../../types/date-range.type';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-range.component.html'
})
export class DateRangeComponent {
  public dateFrom: string = '';
  public dateTo: string = '';

  @Output() dateRangeChange = new EventEmitter<DateRange>();

  public onDateChange(): void {
    this.dateRangeChange.emit({ from: this.dateFrom, to: this.dateTo });
  }
} 