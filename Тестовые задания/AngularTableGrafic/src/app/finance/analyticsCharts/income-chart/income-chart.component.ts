import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-income-chart',
  standalone: true,
  templateUrl: './income-chart.component.html'
})
export class IncomeChartComponent implements OnChanges, AfterViewInit {
  @Input() dateRange!: { from: string, to: string };
  @ViewChild('incomeChart') incomeChartElement!: ElementRef;

  private incomeChart!: echarts.ECharts;
  private categoryNameList: any[] = [];
  private incomeValuesList: any[] = []; 
  private totalIncomeSum: number = 0;

  ngAfterViewInit() {
    if (this.incomeChartElement?.nativeElement) {
      this.incomeChart = echarts.init(this.incomeChartElement.nativeElement);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dateRange'] && this.dateRange?.from && this.dateRange?.to) {
      this.checkDateForIncome();
    }
  }

  private checkDateForIncome(): void {
    const incomeTableData: { category: string; sum: number; data: string }[] =
      JSON.parse(localStorage.getItem("incomeTableRows") || '[]');
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

    const pieChartOptions: EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} руб. ({d}%)",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        top: "bottom",
        data: this.categoryNameList,
      },
      title: {
        text: `${this.totalIncomeSum} руб.`,
        left: "center",
        top: "center",
      },
      series: [
        {
          type: "pie",
          data: this.categoryNameList.map((name, index) => ({ value: this.incomeValuesList[index], name: name })),
          radius: ["50%", "70%"],
          label: {
            show: true,
            formatter: "{c} руб.",
          },
        },
      ],
    };
    this.incomeChart.setOption(pieChartOptions);
  }
}
