import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-income-chart',
  standalone: true,
  templateUrl: './income-chart.component.html'
})
export class IncomeChartComponent implements AfterViewInit, OnChanges {
  @Input() public chartOptions!: EChartsOption;

  @ViewChild('incomeChart') private incomeChartElement!: ElementRef;

  private incomeChart!: echarts.ECharts;

  constructor() { }

  public ngAfterViewInit(): void {
    if (this.incomeChartElement?.nativeElement) {
      this.incomeChart = echarts.init(this.incomeChartElement.nativeElement);
      this.incomeChart.setOption(this.chartOptions);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartOptions'] && this.incomeChart) {
      this.incomeChart.setOption(this.chartOptions);
    }
  }
}
