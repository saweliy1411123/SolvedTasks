import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IncomeDateRangeComponent } from './income-date-range/income-date-range.component';
import { FinanceComparisonDateRangeComponent } from './finance-comparison-date-range/finance-comparison-date-range.component';

@Component({
  selector: 'app-data-selector',
  standalone: true,
  imports: [IncomeDateRangeComponent, FinanceComparisonDateRangeComponent, FormsModule],
  templateUrl: './data-selector.component.html'
})
export class DataSelectorComponent {
  public incomeDateFrom: string = '';
  public incomeDateTo: string = '';
  public comparisonDateFrom: string = '';
  public comparisonDateTo: string = '';

}
