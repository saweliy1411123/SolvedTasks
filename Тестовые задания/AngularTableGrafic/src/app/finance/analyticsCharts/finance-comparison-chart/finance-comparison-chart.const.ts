import type { EChartsOption } from 'echarts';

export const BAR_CHART_OPTIONS: EChartsOption = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    orient: "horizontal",
    left: "center",
    top: "bottom",
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      name: "Доход",
    },
    {
      type: "bar",
      name: "Расход",
    },
  ],
}; 