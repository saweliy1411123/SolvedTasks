import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncomeDateRangeComponent } from './income-date-range/income-date-range.component';
import { FinanceComparisonDateRangeComponent } from './finance-comparison-date-range/finance-comparison-date-range.component';

@Component({
  selector: 'app-data-selector',
  standalone: true,
  imports: [IncomeDateRangeComponent, FinanceComparisonDateRangeComponent, FormsModule],
  templateUrl: './data-selector.component.html',
  styleUrl: './data-selector.component.scss'
})
export class DataSelectorComponent {
  public incomeDateFrom: string = '';
  public incomeDateTo: string = '';
  public comparisonDateFrom: string = '';
  public comparisonDateTo: string = '';

  public onIncomeDateChange(): void {
    console.log('Income date range changed:', this.incomeDateFrom, this.incomeDateTo);
  }

  public onComparisonDateChange(): void {
    console.log('Finance comparison date range changed:', this.comparisonDateFrom, this.comparisonDateTo);
  }
}
