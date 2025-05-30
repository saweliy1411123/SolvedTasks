import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-finance-comparison-chart',
  standalone: true,
  templateUrl: './finance-comparison-chart.component.html'
})
export class FinanceComparisonChartComponent implements AfterViewInit, OnChanges {
  @Input() dateRange!: { from: string, to: string };
  @ViewChild('financeComparisonChart') financeComparisonChartElement!: ElementRef;

  private financialComparisonChart!: echarts.ECharts;
  private categoryNameList: any[] = [];
  private incomeValuesList: any[] = [];
  private expenseValuesList: any[] = [];
  private allDatesList: any[] = [];

  ngAfterViewInit() {
    if (this.financeComparisonChartElement?.nativeElement) {
      this.financialComparisonChart = echarts.init(this.financeComparisonChartElement.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dateRange'] && this.dateRange?.from && this.dateRange?.to) {
      this.checkDateForfinanceComparison();
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
    const incomeTableData: { data: string; sum: number; category: string }[] =
      JSON.parse(localStorage.getItem("incomeTableRows") || '[]');
    const expenseTableData: { data: string; sum: number; category: string }[] =
      JSON.parse(localStorage.getItem("expenseTableRows") || '[]');

    let allDatesList: [string, number, number, string][] = [];
    this.categoryNameList = [];
    this.incomeValuesList = [];
    this.expenseValuesList = [];

    for (let i = 0; i < incomeTableData.length; i++) {
      allDatesList.push([
        incomeTableData[i].data,
        1,
        incomeTableData[i].sum,
        incomeTableData[i].category,
      ]);
    }
    for (let i = 0; i < expenseTableData.length; i++) {
      allDatesList.push([
        expenseTableData[i].data,
        2,
        expenseTableData[i].sum,
        expenseTableData[i].category,
      ]);
    }
    allDatesList.sort((a, b) => a[0].localeCompare(b[0]));
    const filteredData: [string, number, number, string][] = [];
    for (let i = 0; i < allDatesList.length; i++) {
      if (
        (allDatesList[i][0] as string) >= this.dateRange.from &&
        (allDatesList[i][0] as string) <= this.dateRange.to
      ) {
        filteredData.push(allDatesList[i]);
      }
    }
    for (let i = 0; i < filteredData.length; i++) {
      const date = filteredData[i][0] as string;
      const type = Number(filteredData[i][1]);
      const sum = filteredData[i][2];
      
      if (
        i + 1 < filteredData.length &&
        filteredData[i][0] === filteredData[i + 1][0]
      ) {
        this.categoryNameList.push(this.formatDate(date));
        this.incomeValuesList.push(filteredData[i][2]);
        this.expenseValuesList.push(filteredData[i + 1][2]);
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

    const BarChartOptions: EChartsOption = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        top: "bottom",
      },
      xAxis: {
        data: this.categoryNameList,
      },
      yAxis: {},
      series: [
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
      ],
    };
    this.financialComparisonChart.setOption(BarChartOptions);
  }
} 