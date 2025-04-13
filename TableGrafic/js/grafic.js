let myChartFirst = echarts.init(document.getElementById("mainFirst"));
let myChartSecond = echarts.init(document.getElementById("mainSecond"));
let nameElementsFirst = [];
let sumElementsFirst = [];
let nameElementsSecond = [];
let sumElementsSecond = [];
let dateElementFirst = [];
let dateElementSecond = [];

let dateRangeFirst = document.querySelectorAll(".dateElements")[0];
let dateRangeSecond = document.querySelectorAll(".dateElements")[1];
let dateRangeThird = document.querySelectorAll(".dateElements")[2];
let dateRangeFourth = document.querySelectorAll(".dateElements")[3];
let date1 = false;
let date2 = false;
let date3 = false;
let date4 = false;

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
  date1 = true;
  checkDateFirst();
}
function dateRange2() {
  date2 = true;
  checkDateFirst();
}
function dateRange3() {
  date3 = true;
  checkDateSecond();
}
function dateRange4() {
  date4 = true;
  checkDateSecond();
}
function checkDateFirst() {
  if (date1 && date2) {
    let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
    let tableSecond = JSON.parse(localStorage.getItem("tableExpenses")) || [];
    dateElementFirst = [];
    dateElementSecond = [];
    nameElementsFirst = [];
    sumElementsFirst = [];
    nameElementsSecond = [];
    sumElementsSecond = [];

    for (let i = 0; i < tableFirst.length; i++) {
      dateElementFirst.push([tableFirst[i].data, 1, tableFirst[i].sum]);
    }
    for (let i = 0; i < tableSecond.length; i++) {
      dateElementFirst.push([tableSecond[i].data, 2, tableSecond[i].sum]);
    }
    dateElementFirst.sort();
    let rangeDataElement = [];
    let start = formatDate(dateRangeFirst.value);
    let end = formatDate(dateRangeSecond.value);

    for (let i = 0; i < dateElementFirst.length; i++) {
      if (dateElementFirst[i][0] >= start && dateElementFirst[i][0] <= end) {
        rangeDataElement.push(dateElementFirst[i]);
      }
    }
    for (let i = 0; i < rangeDataElement.length; i++) {
      if (
        i + 1 < rangeDataElement.length &&
        rangeDataElement[i][0] == rangeDataElement[i + 1][0]
      ) {
        nameElementsFirst.push(rangeDataElement[i][0]);
        sumElementsFirst.push(rangeDataElement[i][2]);
        sumElementsSecond.push(rangeDataElement[i + 1][2]);
        i += 1;
      } else {
        console.log(
          "Номер таблицы",
          rangeDataElement[i][1],
          "",
          rangeDataElement[i][0],
          "",
          rangeDataElement[i][2]
        );
        nameElementsFirst.push(rangeDataElement[i][0]);
        if (Number(rangeDataElement[i][1]) == 2) {
          sumElementsFirst.push("");
          sumElementsSecond.push(rangeDataElement[i][2]);
        } else {
          sumElementsFirst.push(rangeDataElement[i][2]);
          sumElementsSecond.push("");
        }
      }
    }

    trueFirst();
  }
}

function checkDateSecond() {
  if (date3 && date4) {
    nameElementsFirst = [];
    sumElementsFirst = [];
    let sums = 0;
    let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
    for (let i = 0; i < tableFirst.length; i++) {
      dateElementFirst.push(tableFirst[i].data);
    }
    let start = new Date(dateRangeThird.value);
    let end = new Date(dateRangeFourth.value);
    for (let i = 0; i < tableFirst.length; i++) {
      let targetFirst = new Date(dateElementFirst[i]);
      if (targetFirst >= start && targetFirst <= end) {
        nameElementsFirst.push(tableFirst[i].category);
        sumElementsFirst.push(tableFirst[i].sum);
        sums += +tableFirst[i].sum;
      }
    }
    trueSecond();
  }
}

function trueFirst() {
  optionFirst = {
    xAxis: {
      data: nameElementsFirst,
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: sumElementsFirst,
      },
      {
        type: "bar",
        data: sumElementsSecond,
      },
    ],
  };
  myChartFirst.setOption(optionFirst);
}

function trueSecond() {
  optionSecond = {
    title: {
      text: `${sums} руб.`,
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [],
        radius: ["50%", "70%"],
      },
    ],
  };
  for (let i = 0; i < nameElementsFirst.length; i++) {
    optionSecond.series[0].data.push({
      value: sumElementsFirst[i],
      name: nameElementsFirst[i],
    });
  }

  myChartSecond.setOption(optionSecond);
}
