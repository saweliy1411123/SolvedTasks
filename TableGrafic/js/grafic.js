let myChartFirst = echarts.init(document.getElementById("mainFirst"));
let myChartSecond = echarts.init(document.getElementById("mainSecond"));
let dateForFirstTable = [];
let numberForFirstTable = [];
let numberForSecondTable = [];
let dateArrayForAllTable = [];
let dateArrayForSecondTable = [];
let sumOfNumbers = 0;
let dateRangeFirst = document.querySelectorAll(".dateElements")[0];
let dateRangeSecond = document.querySelectorAll(".dateElements")[1];
let dateRangeThird = document.querySelectorAll(".dateElements")[2];
let dateRangeFourth = document.querySelectorAll(".dateElements")[3];
let firstAlreadyCheck = false;
let secondAlreadyCheck = false;
let thirdAlreadyCheck = false;
let fourthAlreadyCheck = false;

function formatDate(date) {
  let d = new Date(date);
  let day =
    String(d.getDate()).length === 1
      ? String(`0${d.getDate()}`)
      : String(d.getDate());
  let month =
    String(d.getMonth() + 1).length === 1
      ? String(`0${d.getMonth() + 1}`)
      : String(d.getMonth() + 1);
  let year = d.getFullYear();
  return `${year}-${month}-${day}`;
}

function dateRange1() {
  firstAlreadyCheck = true;
  checkDateFirst();
}
function dateRange2() {
  secondAlreadyCheck = true;
  checkDateFirst();
}
function dateRange3() {
  thirdAlreadyCheck = true;
  checkDateSecond();
}
function dateRange4() {
  fourthAlreadyCheck = true;
  checkDateSecond();
}
function checkDateFirst() {
  if (firstAlreadyCheck && secondAlreadyCheck) {
    let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
    let tableSecond = JSON.parse(localStorage.getItem("tableExpenses")) || [];
    dateArrayForAllTable = [];
    dateForFirstTable = [];
    numberForFirstTable = [];
    numberForSecondTable = [];

    for (let i = 0; i < tableFirst.length; i++) {
      dateArrayForAllTable.push([
        formatDate(tableFirst[i].data),
        1,
        tableFirst[i].sum,
        tableFirst[i].category,
      ]);
    }
    for (let i = 0; i < tableSecond.length; i++) {
      dateArrayForAllTable.push([
        formatDate(tableSecond[i].data),
        2,
        tableSecond[i].sum,
        tableSecond[i].category,
      ]);
    }
    dateArrayForAllTable.sort();
    let rangeDataElement = [];
    let start = formatDate(dateRangeFirst.value);
    let end = formatDate(dateRangeSecond.value);

    for (let i = 0; i < dateArrayForAllTable.length; i++) {
      if (
        dateArrayForAllTable[i][0] >= start &&
        dateArrayForAllTable[i][0] <= end
      ) {
        rangeDataElement.push(dateArrayForAllTable[i]);
      }
    }
    for (let i = 0; i < rangeDataElement.length; i++) {
      if (
        i + 1 < rangeDataElement.length &&
        rangeDataElement[i][0] == rangeDataElement[i + 1][0]
      ) {
        dateForFirstTable.push(rangeDataElement[i][0]);
        numberForFirstTable.push(rangeDataElement[i][2]);
        numberForSecondTable.push(rangeDataElement[i + 1][2]);
        i += 1;
      } else {
        dateForFirstTable.push(rangeDataElement[i][0]);
        if (Number(rangeDataElement[i][1]) == 2) {
          numberForFirstTable.push("");
          numberForSecondTable.push(rangeDataElement[i][2]);
        } else {
          numberForFirstTable.push(rangeDataElement[i][2]);
          numberForSecondTable.push("");
        }
      }
    }

    trueFirst();
  }
}

function checkDateSecond() {
  if (thirdAlreadyCheck && fourthAlreadyCheck) {
    dateForFirstTable = [];
    numberForFirstTable = [];
    dateArrayForAllTable = [];
    sumOfNumbers = 0;
    let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
    for (let i = 0; i < tableFirst.length; i++) {
      dateArrayForAllTable.push(formatDate(tableFirst[i].data));
    }
    let start = formatDate(dateRangeThird.value);
    let end = formatDate(dateRangeFourth.value);
    for (let i = 0; i < tableFirst.length; i++) {
      let targetFirst = dateArrayForAllTable[i];
      if (targetFirst >= start && targetFirst <= end) {
        dateForFirstTable.push(tableFirst[i].category);
        numberForFirstTable.push(tableFirst[i].sum);
        sumOfNumbers += +tableFirst[i].sum;
      }
    }
    console.log(sumOfNumbers);
    trueSecond();
  }
}

function trueFirst() {
  optionFirst = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
    },
    xAxis: {
      data: dateForFirstTable,
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        name: "Доход",
        data: numberForFirstTable,
      },
      {
        type: "bar",
        name: "Расход",
        data: numberForSecondTable,
      },
    ],
  };
  myChartFirst.setOption(optionFirst);
}

function trueSecond() {
  optionSecond = {
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
      text: `${sumOfNumbers} руб.`,
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
  for (let i = 0; i < dateForFirstTable.length; i++) {
    optionSecond.series[0].data.push({
      value: numberForFirstTable[i],
      name: dateForFirstTable[i],
    });
    optionSecond.legend.data.push(dateForFirstTable[i]);
  }

  myChartSecond.setOption(optionSecond);
}
