import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DateRange } from '../../types/date-range.type';
import * as echarts from 'echarts';
import type { EChartsOption, LegendComponentOption, TitleComponentOption } from 'echarts';
import { PIE_CHART_OPTIONS } from './income-chart.const';
import { LocalStorageService } from '../../services/local-storage.service';
import { ChartDataItem } from '../../types/chart-data.type';

@Component({
  selector: 'app-income-chart',
  standalone: true,
  templateUrl: './income-chart.component.html'
})
export class IncomeChartComponent implements AfterViewInit {
  private _dateRange!: DateRange;

  @Input()
  set dateRange(value: DateRange) {
    this._dateRange = value;
    if (this._dateRange?.from && this._dateRange?.to) {
      this.checkDateForIncome();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  @ViewChild('incomeChart') incomeChartElement!: ElementRef;

  private incomeChart!: echarts.ECharts;
  private categoryNameList: string[] = [];
  private incomeValuesList: number[] = [];
  private totalIncomeSum: number = 0;

  constructor(private localStorageService: LocalStorageService) { }

  ngAfterViewInit() {
    if (this.incomeChartElement?.nativeElement) {
      this.incomeChart = echarts.init(this.incomeChartElement.nativeElement);
    }
  }

  private checkDateForIncome(): void {
    const incomeTableData: ChartDataItem[] =
      this.localStorageService.getItem<ChartDataItem[]>(this.localStorageService.INCOME_TABLE_ROWS_KEY) || [];
    const filteredIncomeData = incomeTableData.filter(item =>
      item.data >= this.dateRange.from && item.data <= this.dateRange.to
    );

    this.categoryNameList = [];
    this.incomeValuesList = [];
    this.totalIncomeSum = 0;

     for (const item of filteredIncomeData) {
      this.categoryNameList.push(item.category);
      this.incomeValuesList.push(+item.sum); 
      this.totalIncomeSum += +item.sum;      
    }

    this.createIncomeChart();
  }

  private createIncomeChart(): void {
    if (!this.incomeChart) return;

    const pieChartOptions: EChartsOption = { ...PIE_CHART_OPTIONS };

    (pieChartOptions.legend as LegendComponentOption).data = this.categoryNameList;
    (pieChartOptions.title as TitleComponentOption).text = `${this.totalIncomeSum} руб.`;
    pieChartOptions.series = [
      {
        type: "pie",
        data: this.categoryNameList.map((name, index) => ({ value: this.incomeValuesList[index], name: name })),
        radius: ["50%", "70%"],
        label: {
          show: true,
          formatter: "{c} руб.",
        },
      },
    ];

    this.incomeChart.setOption(pieChartOptions);
  }
}
