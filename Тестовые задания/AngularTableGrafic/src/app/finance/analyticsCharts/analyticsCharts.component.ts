import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateCheckerComponent } from './date-checker/date-checker.component';
import { GraficCreateComponent } from './grafic-create/grafic-create.component';

@Component({
  selector: 'app-analyticsCharts',
  imports: [RouterLink, DateCheckerComponent, GraficCreateComponent],
  templateUrl: './analyticsCharts.component.html',
  styleUrl: './analyticsCharts.component.scss'
})
export class AnalyticsChartsComponent {
  incomeChartDateFrom() {
    console.log('Changed income chart start date');
  }

  incomeChartDateTo() {
    console.log('Changed income chart end date');
  }

  financeComparisonDateFrom() {
    console.log('Changed comparison start date');
  }

  financeComparisonDateTo() {
    console.log('Changed comparison end date');
  }

}
