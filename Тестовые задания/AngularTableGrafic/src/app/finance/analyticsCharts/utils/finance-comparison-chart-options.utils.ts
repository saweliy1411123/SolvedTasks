import type { EChartsOption, XAXisComponentOption } from 'echarts';
import { FINANCE_COMPARISON_CHART_OPTIONS } from '../finance-comparison-chart/finance-comparison-chart.const';

export function createFinanceComparisonChartOptions(
  categoryNameList: string[],
  incomeValuesList: number[],
  expenseValuesList: number[]
): EChartsOption {
  const BarChartOptions: EChartsOption = { ...FINANCE_COMPARISON_CHART_OPTIONS };

  ((BarChartOptions.xAxis as XAXisComponentOption & { type: 'category'; data: string[] })).data = categoryNameList;
  BarChartOptions.series = [
    {
      type: "bar",
      name: "Доход",
      data: incomeValuesList,
    },
    {
      type: "bar",
      name: "Расход",
      data: expenseValuesList,
    },
  ];
  return BarChartOptions;
} 