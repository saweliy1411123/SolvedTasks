import { Component } from '@angular/core';

@Component({
  selector: 'app-income-chart',
  standalone: true,
  templateUrl: './income-chart.component.html'
})
export class IncomeChartComponent {

  public incomeChartDateFrom(): void {
    console.log('Changed income chart start date');
  }

  public incomeChartDateTo(): void {
    console.log('Changed income chart end date');
  }
}
