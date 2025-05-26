import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataSelectorComponent } from './data-selector/data-selector.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { FinanceComparisonChartComponent } from './finance-comparison-chart/finance-comparison-chart.component';


@Component({
  selector: 'app-analyticsCharts',
  imports: [RouterLink, DataSelectorComponent, IncomeChartComponent, FinanceComparisonChartComponent],
  templateUrl: './analyticsCharts.component.html',
  styleUrl: './analyticsCharts.component.scss'
})
export class AnalyticsChartsComponent {
  public incomeChartDateFrom(): void {
    console.log('Changed income chart start date');
  }

  public incomeChartDateTo(): void {
    console.log('Changed income chart end date');
  }

  public financeComparisonDateFrom(): void {
    console.log('Changed comparison start date');
  }

  public financeComparisonDateTo(): void {
    console.log('Changed comparison end date');
  }

}
