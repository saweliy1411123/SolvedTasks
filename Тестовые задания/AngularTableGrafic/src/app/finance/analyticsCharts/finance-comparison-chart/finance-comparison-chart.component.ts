import { Component } from '@angular/core';

@Component({
  selector: 'app-finance-comparison-chart',
  standalone: true,
  templateUrl: './finance-comparison-chart.component.html'
})
export class FinanceComparisonChartComponent {
  public expenseChartDateFrom(): void {
    console.log('Changed expense chart start date');
  }

  public expenseChartDateTo(): void {
    console.log('Changed expense chart end date');
  }
} 