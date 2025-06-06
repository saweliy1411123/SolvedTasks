import type { EChartsOption } from 'echarts';

export const INCOME_CHART_OPTIONS: EChartsOption = {
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} руб. ({d}%)",
  },
  legend: {
    orient: "horizontal",
    left: "center",
    top: "bottom",
  },
  title: {
    left: "center",
    top: "center",
  },
  series: [
    {
      type: "pie",
      radius: ["50%", "70%"],
      label: {
        show: true,
        formatter: "{c} руб.",
      },
    },
  ],
}; 