import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-finance-comparison-chart',
  standalone: true,
  templateUrl: './finance-comparison-chart.component.html'
})
export class FinanceComparisonChartComponent implements AfterViewInit, OnChanges {
  @Input() public financeChartOptions!: EChartsOption;

  @ViewChild('financeComparisonChart') private financeComparisonChartElement!: ElementRef;

  private financialComparisonChart!: echarts.ECharts;

  constructor() { }

  public ngAfterViewInit(): void {
    if (this.financeComparisonChartElement?.nativeElement) {
      this.financialComparisonChart = echarts.init(this.financeComparisonChartElement.nativeElement);
      this.financialComparisonChart.setOption(this.financeChartOptions);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['financeChartOptions'] && this.financialComparisonChart) {
      this.financialComparisonChart.setOption(this.financeChartOptions);
    }
  }
} 