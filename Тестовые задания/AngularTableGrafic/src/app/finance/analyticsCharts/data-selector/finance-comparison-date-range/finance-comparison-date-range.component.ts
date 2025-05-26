import { Component } from '@angular/core';
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

  public onDateChange(): void {
    console.log('Finance comparison date range changed:', this.dateFrom, this.dateTo);
  }
} 