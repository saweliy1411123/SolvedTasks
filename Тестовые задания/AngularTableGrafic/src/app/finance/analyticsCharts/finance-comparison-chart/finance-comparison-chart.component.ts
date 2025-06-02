import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { DateRange } from '../../types/date-range.type';
import * as echarts from 'echarts';
import type { EChartsOption, LegendComponentOption } from 'echarts';
import { BAR_CHART_OPTIONS } from './finance-comparison-chart.const';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChartDataItem, AllDatesListItem } from '../../types/chart-data.type';

@Component({
  selector: 'app-finance-comparison-chart',
  standalone: true,
  templateUrl: './finance-comparison-chart.component.html'
})
export class FinanceComparisonChartComponent implements AfterViewInit {
  private _dateRange!: DateRange;

  @Input()
  set dateRange(value: DateRange) {
    this._dateRange = value;
    if (this._dateRange?.from && this._dateRange?.to) {
      this.checkDateForfinanceComparison();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }
  @ViewChild('financeComparisonChart') financeComparisonChartElement!: ElementRef;

  private financialComparisonChart!: echarts.ECharts;
  private categoryNameList: string[] = [];
  private incomeValuesList: number[] = [];
  private expenseValuesList: number[] = [];
  private allDatesList: AllDatesListItem[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngAfterViewInit() {
    if (this.financeComparisonChartElement?.nativeElement) {
      this.financialComparisonChart = echarts.init(this.financeComparisonChartElement.nativeElement);
    }
  }

  private formatDate(date: string | number | Date): string {
    let d = new Date(date);
    let day = String(d.getDate()).padStart(2, "0");
    let month = String(d.getMonth() + 1).padStart(2, "0");
    let year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  private checkDateForfinanceComparison(): void {
    const incomeTableData: ChartDataItem[] =
      this.localStorageService.getItem<ChartDataItem[]>(this.localStorageService.INCOME_TABLE_ROWS_KEY) || [];
    const expenseTableData: ChartDataItem[] =
      this.localStorageService.getItem<ChartDataItem[]>(this.localStorageService.EXPENSE_TABLE_ROWS_KEY) || [];

    let allDatesList: AllDatesListItem[] = [];
    this.categoryNameList = [];
    this.incomeValuesList = [];
    this.expenseValuesList = [];

    for (let i = 0; i < incomeTableData.length; i++) {
      allDatesList.push({
        date: incomeTableData[i].data,
        type: 1,
        sum: incomeTableData[i].sum,
        category: incomeTableData[i].category,
      });
    }
    for (let i = 0; i < expenseTableData.length; i++) {
      allDatesList.push({
        date: expenseTableData[i].data,
        type: 2,
        sum: expenseTableData[i].sum,
        category: expenseTableData[i].category,
      });
    }
    allDatesList.sort((a, b) => a.date.localeCompare(b.date));
    const filteredData: AllDatesListItem[] = [];
    for (let i = 0; i < allDatesList.length; i++) {
      if (
        allDatesList[i].date >= this.dateRange.from &&
        allDatesList[i].date <= this.dateRange.to
      ) {
        filteredData.push(allDatesList[i]);
      }
    }
    for (let i = 0; i < filteredData.length; i++) {
      const date = filteredData[i].date;
      const type = filteredData[i].type;
      const sum = filteredData[i].sum;
      
      if (
        i + 1 < filteredData.length &&
        filteredData[i].date === filteredData[i + 1].date
      ) {
        this.categoryNameList.push(this.formatDate(date));
        this.incomeValuesList.push(filteredData[i].sum);
        this.expenseValuesList.push(filteredData[i + 1].sum);
        i += 1;
      } else {
        this.categoryNameList.push(this.formatDate(date));
        if (type === 2) {
          this.incomeValuesList.push(0);
          this.expenseValuesList.push(sum);
        } else {
          this.incomeValuesList.push(sum);
          this.expenseValuesList.push(0);
        }
      }
    }
    this.createFinanceComparisonChart();
  }

  private createFinanceComparisonChart(): void {
    if (!this.financialComparisonChart) return;

    const BarChartOptions: EChartsOption = { ...BAR_CHART_OPTIONS };

    (BarChartOptions.xAxis as any).data = this.categoryNameList;
    BarChartOptions.series = [
      {
        type: "bar",
        name: "Доход",
        data: this.incomeValuesList,
      },
      {
        type: "bar",
        name: "Расход",
        data: this.expenseValuesList,
      },
    ];
    this.financialComparisonChart.setOption(BarChartOptions);
  }
} 