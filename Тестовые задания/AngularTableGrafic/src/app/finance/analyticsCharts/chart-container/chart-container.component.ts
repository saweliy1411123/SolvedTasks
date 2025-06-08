import { Component, Input, OnInit } from '@angular/core';
import { DateRangeComponent } from '../date-range/date-range.component';
import { IncomeChartComponent } from '../income-chart/income-chart.component';
import { FinanceComparisonChartComponent } from '../finance-comparison-chart/finance-comparison-chart.component';
import { DateRange } from '../../types/date-range.type';
import { NgIf } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChartDataItem} from '../../types/chart-data.type';
import { createIncomeChartOptions } from '../utils/income-chart-options.utils';
import { createFinanceComparisonChartOptions } from '../utils/finance-comparison-chart-options.utils';
import { formatDate } from '../finance-comparison-chart/utils/format-date.utils';
import { processChartData } from '../finance-comparison-chart/utils/process-chart-data.utils';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart-container',
  standalone: true,
  imports: [
    DateRangeComponent,
    IncomeChartComponent,
    FinanceComparisonChartComponent,
    NgIf
  ],
  templateUrl: './chart-container.component.html'
})
export class ChartContainerComponent implements OnInit {
  @Input() public chartType!: 'income' | 'financeComparison';

  public dateRange: DateRange = { from: '', to: '' };
  public incomeChartOptions: EChartsOption = {};
  public financeChartOptions: EChartsOption = {};

  constructor(private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    if (this.dateRange.from && this.dateRange.to) {
      this.generateChartOptions();
    }
  }

  public onDateRangeChange(range: DateRange): void {
    this.dateRange = range;
    if (this.dateRange.from && this.dateRange.to) {
      this.generateChartOptions();
    }
  }

  private generateChartOptions(): void {
    if (this.chartType === 'income') {
      const incomeTableData: ChartDataItem[] =
        this.localStorageService.getChartData(this.localStorageService.INCOME_TABLE_ROWS_KEY);
      const filteredIncomeData: ChartDataItem[] = incomeTableData.filter((item: ChartDataItem) =>
        item.data >= this.dateRange.from && item.data <= this.dateRange.to
      );

      const categoryNameList: string[] = [];
      const incomeValuesList: number[] = [];
      let totalIncomeSum: number = 0;

      for (const item of filteredIncomeData) {
        categoryNameList.push(item.category);
        incomeValuesList.push(+item.sum);
        totalIncomeSum += +item.sum;
      }
      this.incomeChartOptions = createIncomeChartOptions(categoryNameList, incomeValuesList, totalIncomeSum);
    } else if (this.chartType === 'financeComparison') {
      const incomeTableData: ChartDataItem[] =
        this.localStorageService.getChartData(this.localStorageService.INCOME_TABLE_ROWS_KEY);
      const expenseTableData: ChartDataItem[] =
        this.localStorageService.getChartData(this.localStorageService.EXPENSE_TABLE_ROWS_KEY);

      const { categoryNameList, incomeValuesList, expenseValuesList } = processChartData(
        incomeTableData,
        expenseTableData,
        this.dateRange,
        formatDate
      );
      this.financeChartOptions = createFinanceComparisonChartOptions(categoryNameList, incomeValuesList, expenseValuesList);
    }
  }
} 