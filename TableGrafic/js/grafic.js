let myChartFirst = echarts.init(document.getElementById("mainFirst"));
let myChartSecond = echarts.init(document.getElementById("mainSecond"));
let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
let tableSecond = JSON.parse(localStorage.getItem("tableExpenses")) || [];
let nameElementsFirst = [];
let sumElementsFirst = [];
let nameElementsSecond = [];
let sumElementsSecond = [];
let dateElementFirst = [];
let dateElementSecond = [];
let sums = 0;

let dateRangeFirst = document.querySelectorAll(".dateElements")[0];
let dateRangeSecond = document.querySelectorAll(".dateElements")[1];
let dateRangeThird = document.querySelectorAll(".dateElements")[2];
let dateRangeFourth = document.querySelectorAll(".dateElements")[3];
let date1 = false;
let date2 = false;
let date3 = false;
let date4 = false;

for (let i = 0; i < tableFirst.length; i++) {
  dateElementFirst.push(tableFirst[i].data);
}

for (let i = 0; i < tableSecond.length; i++) {
  dateElementSecond.push(tableSecond[i].data);
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
    let start = new Date(dateRangeFirst.value);
    let end = new Date(dateRangeSecond.value);
    for (let i = 0; i < tableFirst.length; i++) {
      let targetFirst = new Date(dateElementFirst[i]);
      let targetSecond = new Date(dateElementSecond[i]);
      if (
        targetFirst >= start &&
        targetFirst <= end &&
        targetSecond >= start &&
        targetSecond <= end
      ) {
        nameElementsFirst.push(tableFirst[i].category);
        sumElementsFirst.push(tableFirst[i].sum);
        nameElementsSecond.push(tableSecond[i].category);
        sumElementsSecond.push(tableSecond[i].sum);
      } else {
        console.log("Таких нет");
      }
    }
    trueFirst();
  }
  nameElementsFirst = [];
  sumElementsFirst = [];
  nameElementsSecond = [];
  sumElementsSecond = [];
  sums = 0;
}

function checkDateSecond() {
  if (date3 && date4) {
    let start = new Date(dateRangeThird.value);
    let end = new Date(dateRangeFourth.value);
    for (let i = 0; i < tableFirst.length; i++) {
      let targetFirst = new Date(dateElementFirst[i]);
      let targetSecond = new Date(dateElementSecond[i]);
      if (
        targetFirst >= start &&
        targetFirst <= end &&
        targetSecond >= start &&
        targetSecond <= end
      ) {
        nameElementsFirst.push(tableFirst[i].category);
        sumElementsFirst.push(tableFirst[i].sum);
        nameElementsSecond.push(tableSecond[i].category);
        sumElementsSecond.push(tableSecond[i].sum);
        sums += +tableFirst[i].sum;
      } else {
        console.log("Таких нет");
      }
    }
    trueSecond();
  }
  nameElementsFirst = [];
  sumElementsFirst = [];
  nameElementsSecond = [];
  sumElementsSecond = [];
  sums = 0;
}

function trueFirst() {
  optionFirst = {
    xAxis: {
      data: dateElementFirst,
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
  let nameElements = [...nameElementsFirst, ...nameElementsSecond];
  let sumElements = [...sumElementsFirst, ...sumElementsSecond];
  for (let i = 0; i < nameElements.length; i++) {
    optionSecond.series[0].data.push({
      value: sumElements[i],
      name: nameElements[i],
    });
  }

  myChartSecond.setOption(optionSecond);
}
