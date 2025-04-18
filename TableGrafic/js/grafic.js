const financialComparisonChart = echarts.init(
  document.getElementById("barChart")
);
const ringChartForIncome = echarts.init(document.getElementById("ringChart"));
let categoryNameList = [];
let incomeValuesList = [];
let expenseValuesList = [];
let allDatesList = [];

let totalIncomeSum = 0;
let startRingChartDate = document.querySelectorAll(".dateElements")[0];
let endRingChartDate = document.querySelectorAll(".dateElements")[1];
let startBarChartDate = document.querySelectorAll(".dateElements")[2];
let endBarChartDate = document.querySelectorAll(".dateElements")[3];
let isStartDateForRingChart = false;
let isEndDateForRingChart = false;
let isStartDateForBarChart = false;
let isEndDateForBarChart = false;

function setStartDateForRingChart() {
  isStartDateForRingChart = true;
  checkDateForRing();
}
function setEndDateForRingChart() {
  isEndDateForRingChart = true;
  checkDateForRing();
}
function setStartDateForBarChart() {
  isStartDateForBarChart = true;
  checkDateForBar();
}
function setEndDateForBarChart() {
  isEndDateForBarChart = true;
  checkDateForBar();
}

function formatDate(date) {
  let d = new Date(date);
  let day = String(d.getDate()).padStart(2, "0");
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function checkDateForRing() {
  if (isStartDateForRingChart && isEndDateForRingChart) {
    categoryNameList = [];
    incomeValuesList = [];
    allDatesList = [];
    totalIncomeSum = 0;
    let incomeTableData =
      JSON.parse(localStorage.getItem("incomeTableRows")) || [];
    for (let i = 0; i < incomeTableData.length; i++) {
      allDatesList.push(incomeTableData[i].data);
    }
    let start = startRingChartDate.value;
    let end = endRingChartDate.value;
    for (let i = 0; i < incomeTableData.length; i++) {
      if (allDatesList[i] >= start && allDatesList[i] <= end) {
        categoryNameList.push(incomeTableData[i].category);
        incomeValuesList.push(incomeTableData[i].sum);
        totalIncomeSum += +incomeTableData[i].sum;
      }
    }
    createBarChart();
  }
}

function checkDateForBar() {
  if (isStartDateForBarChart && isEndDateForBarChart) {
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
    let start = startBarChartDate.value;
    let end = endBarChartDate.value;

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
        categoryNameList.push(formatDate(filteredData[i][0]));
        incomeValuesList.push(filteredData[i][2]);
        expenseValuesList.push(filteredData[i + 1][2]);
        i += 1;
      } else {
        categoryNameList.push(formatDate(filteredData[i][0]));
        if (Number(filteredData[i][1]) == 2) {
          incomeValuesList.push("");
          expenseValuesList.push(filteredData[i][2]);
        } else {
          incomeValuesList.push(filteredData[i][2]);
          expenseValuesList.push("");
        }
      }
    }

    createRingChart();
  }
}

function createBarChart() {
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

  ringChartForIncome.setOption(pieChartOptions);
}

function createRingChart() {
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
  financialComparisonChart.setOption(BarChartOptions);
}
