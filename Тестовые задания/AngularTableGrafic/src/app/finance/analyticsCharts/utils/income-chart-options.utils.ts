import type { EChartsOption, LegendComponentOption, TitleComponentOption } from 'echarts';
import { INCOME_CHART_OPTIONS } from '../income-chart/income-chart.const';

export function createIncomeChartOptions(
  categoryNameList: string[],
  incomeValuesList: number[],
  totalIncomeSum: number
): EChartsOption {
  const pieChartOptions: EChartsOption = { ...INCOME_CHART_OPTIONS };

  (pieChartOptions.legend as LegendComponentOption).data = categoryNameList;
  (pieChartOptions.title as TitleComponentOption).text = `${totalIncomeSum} руб.`;
  pieChartOptions.series = [
    {
      type: "pie",
      data: categoryNameList.map((name, index) => ({ value: incomeValuesList[index], name: name })),
      radius: ["50%", "70%"],
      label: {
        show: true,
        formatter: "{c} руб.",
      },
    },
  ];
  return pieChartOptions;
} 