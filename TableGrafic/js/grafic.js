let barChart = echarts.init(document.getElementById("mainFirst"));
let ringChart = echarts.init(document.getElementById("mainSecond"));
let categoryNameList = [];
let incomeValuesList = [];
let expenseValuesList = [];
let allDatesList = [];

let totalIncomeSum = 0;
let dateRangeFromFirst = document.querySelectorAll(".dateElements")[0];
let dateRangeToFirst = document.querySelectorAll(".dateElements")[1];
let dateRangeFromSecond = document.querySelectorAll(".dateElements")[2];
let dateRangeToSecond = document.querySelectorAll(".dateElements")[3];
let isDateFromFirst = false;
let isDateToFirst = false;
let isDateFromSecond = false;
let isDateToSecond = false;

function checkProcessDateFromFirst() {
  isDateFromFirst = true;
  checkDateFirstRange();
}
function checkProcessDateToFirst() {
  isDateToFirst = true;
  checkDateFirstRange();
}
function checkProcessDateFromSecond() {
  isDateFromSecond = true;
  checkDateSecondRange();
}
function checkProcessDateToSecond() {
  isDateToSecond = true;
  checkDateSecondRange();
}
function checkDateFirstRange() {
  if (isDateFromFirst && isDateToFirst) {
    categoryNameList = [];
    incomeValuesList = [];
    allDatesList = [];
    totalIncomeSum = 0;
    let incomeTableData =
      JSON.parse(localStorage.getItem("incomeTableRows")) || [];
    for (let i = 0; i < incomeTableData.length; i++) {
      allDatesList.push(incomeTableData[i].data);
    }
    let start = dateRangeFromFirst.value;
    let end = dateRangeToFirst.value;
    for (let i = 0; i < incomeTableData.length; i++) {
      let targetFirst = allDatesList[i];
      if (targetFirst >= start && targetFirst <= end) {
        categoryNameList.push(incomeTableData[i].category);
        incomeValuesList.push(incomeTableData[i].sum);
        totalIncomeSum += +incomeTableData[i].sum;
      }
    }
    generateBarChart();
  }
}

function checkDateSecondRange() {
  if (isDateFromSecond && isDateToSecond) {
    let incomeTableData =
      JSON.parse(localStorage.getItem("incomeTableRows")) || [];
    let expenseTableData =
      JSON.parse(localStorage.getItem("expenseTableRows")) || [];
    allDatesList = [];
    categoryNameList = [];
    incomeValuesList = [];
    expenseValuesList = [];

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
    allDatesList.sort();
    let filteredData = [];
    let start = dateRangeFromSecond.value;
    let end = dateRangeToSecond.value;

    for (let i = 0; i < allDatesList.length; i++) {
      if (allDatesList[i][0] >= start && allDatesList[i][0] <= end) {
        filteredData.push(allDatesList[i]);
      }
    }
    for (let i = 0; i < filteredData.length; i++) {
      if (
        i + 1 < filteredData.length &&
        filteredData[i][0] == filteredData[i + 1][0]
      ) {
        categoryNameList.push(filteredData[i][0]);
        incomeValuesList.push(filteredData[i][2]);
        expenseValuesList.push(filteredData[i + 1][2]);
        i += 1;
      } else {
        categoryNameList.push(filteredData[i][0]);
        if (Number(filteredData[i][1]) == 2) {
          incomeValuesList.push("");
          expenseValuesList.push(filteredData[i][2]);
        } else {
          incomeValuesList.push(filteredData[i][2]);
          expenseValuesList.push("");
        }
      }
    }

    generateRingChart();
  }
}

function generateBarChart() {
  pieChartOptions = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} руб. ({d}%)",
    },
    legend: {
      orient: "horizontal",
      x: "center",
      top: "bottom",
      data: [],
    },
    title: {
      text: `${totalIncomeSum} руб.`,
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [],
        radius: ["50%", "70%"],
        label: {
          show: true,
          formatter: "{c} руб.",
        },
      },
    ],
  };
  for (let i = 0; i < categoryNameList.length; i++) {
    pieChartOptions.series[0].data.push({
      value: incomeValuesList[i],
      name: categoryNameList[i],
    });
    pieChartOptions.legend.data.push(categoryNameList[i]);
  }

  barChart.setOption(pieChartOptions);
}

function generateRingChart() {
  BarChartOptions = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      x: "center",
      top: "bottom",
    },
    xAxis: {
      data: categoryNameList,
    },
    yAxis: {},
    series: [
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
    ],
  };
  ringChart.setOption(BarChartOptions);
}
