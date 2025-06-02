import { Component, Input, OnInit } from '@angular/core';
import { DateRangeComponent } from '../date-range/date-range.component';
import { IncomeChartComponent } from '../income-chart/income-chart.component';
import { FinanceComparisonChartComponent } from '../finance-comparison-chart/finance-comparison-chart.component';
import { DateRange } from '../../types/date-range.type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chart-container-with-date-selector',
  standalone: true,
  imports: [
    DateRangeComponent,
    IncomeChartComponent,
    FinanceComparisonChartComponent,
    NgIf
  ],
  templateUrl: './chart-container-with-date-selector.component.html'
})
export class ChartContainerWithDateSelectorComponent implements OnInit {
  @Input() chartType!: 'income' | 'financeComparison';

  public dateRange: DateRange = { from: '', to: '' };

  ngOnInit() {
  }

  onDateRangeChange(range: DateRange) {
    this.dateRange = range;
  }
} 