let myChartFirst = echarts.init(document.getElementById("mainFirst"));
let myChartSecond = echarts.init(document.getElementById("mainSecond"));
let nameElementsFirst = [];
let nameFirst = [];
let nameSecond = [];
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
      dateElementFirst.push([
        formatDate(tableFirst[i].data),
        1,
        tableFirst[i].sum,
        tableFirst[i].category,
      ]);
    }
    for (let i = 0; i < tableSecond.length; i++) {
      dateElementFirst.push([
        formatDate(tableSecond[i].data),
        2,
        tableSecond[i].sum,
        tableSecond[i].category,
      ]);
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
        nameFirst.push(rangeDataElement[i][3]);
        nameSecond.push(rangeDataElement[i + 1][3]);
        console.log(nameFirst);
        console.log(nameSecond);
        i += 1;
      } else {
        nameElementsFirst.push(rangeDataElement[i][0]);
        if (Number(rangeDataElement[i][1]) == 2) {
          sumElementsFirst.push("");
          sumElementsSecond.push(rangeDataElement[i][2]);
          nameSecond.push(rangeDataElement[i + 1][3]);
          nameFirst.push("");
          console.log(nameFirst);
          console.log(nameSecond);
        } else {
          sumElementsFirst.push(rangeDataElement[i][2]);
          sumElementsSecond.push("");
          nameFirst.push(rangeDataElement[i][3]);
          nameSecond.push("");
          console.log(nameFirst);
          console.log(nameSecond);
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
    dateElementFirst = [];
    sums = 0;
    let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
    for (let i = 0; i < tableFirst.length; i++) {
      dateElementFirst.push(formatDate(tableFirst[i].data));
    }
    let start = formatDate(dateRangeThird.value);
    let end = formatDate(dateRangeFourth.value);
    for (let i = 0; i < tableFirst.length; i++) {
      let targetFirst = dateElementFirst[i];
      if (targetFirst >= start && targetFirst <= end) {
        nameElementsFirst.push(tableFirst[i].category);
        sumElementsFirst.push(tableFirst[i].sum);
        sums += +tableFirst[i].sum;
      }
    }
    console.log(sums);
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
      data: nameElementsFirst,
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        name: "Доход",
        data: sumElementsFirst,
      },
      {
        type: "bar",
        name: "Расход",
        data: sumElementsSecond,
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
      text: `${sums} руб.`,
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
  for (let i = 0; i < nameElementsFirst.length; i++) {
    optionSecond.series[0].data.push({
      value: sumElementsFirst[i],
      name: nameElementsFirst[i],
    });
    optionSecond.legend.data.push(nameElementsFirst[i]);
  }

  myChartSecond.setOption(optionSecond);
}
