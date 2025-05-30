import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataSelectorComponent } from './data-selector/data-selector.component';
import { IncomeChartComponent } from './income-chart/income-chart.component';
import { FinanceComparisonChartComponent } from './finance-comparison-chart/finance-comparison-chart.component';


@Component({
  selector: 'app-analyticsCharts',
  imports: [RouterLink, DataSelectorComponent, IncomeChartComponent, FinanceComparisonChartComponent],
  templateUrl: './analyticsCharts.component.html'
})
export class AnalyticsChartsComponent {

}
