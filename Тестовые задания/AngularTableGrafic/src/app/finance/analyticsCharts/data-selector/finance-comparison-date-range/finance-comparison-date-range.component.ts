import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-finance-comparison-date-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './finance-comparison-date-range.component.html'
})
export class FinanceComparisonDateRangeComponent {
  public dateFrom: string = '';
  public dateTo: string = '';

  @Output() dateRangeChange = new EventEmitter<{from: string, to: string}>();

  public onDateChange(): void {
    this.dateRangeChange.emit({ from: this.dateFrom, to: this.dateTo });
  }
} 