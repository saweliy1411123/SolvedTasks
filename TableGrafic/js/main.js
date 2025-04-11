let gridApi;
let gridCheckFirst = false;
let gridCheckSecond = false;
const gridOptions_1 = {
  rowData: [],
  columnDefs: [{ field: "category" }, { field: "sum" }, { field: "data" }],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    gridOptions_1.api = params.api;
    gridCheckFirst = true;
    check();
  },
  onSelectionChanged: () => {
    let selectedRowsFirst = gridOptions_1.api.getSelectedRows().length;
    if (selectedRowsFirst === 1) {
      redButtonFirst.disabled = false;
    } else {
      redButtonFirst.disabled = true;
    }
  },
};

const gridOptions_2 = {
  rowData: [],
  columnDefs: [{ field: "category" }, { field: "sum" }, { field: "data" }],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    gridOptions_2.api = params.api;
    gridCheckSecond = true;
    check();
  },
  onSelectionChanged: () => {
    let selectedRowsSecond = gridOptions_2.api.getSelectedRows().length;
    if (selectedRowsSecond === 1) {
      redButtonSecond.disabled = false;
    } else {
      redButtonSecond.disabled = true;
    }
  },
};

const myGridfirst = document.querySelector("#myGridfirst");
const myGridsecond = document.querySelector("#myGridsecond");
agGrid.createGrid(myGridfirst, gridOptions_1);
agGrid.createGrid(myGridsecond, gridOptions_2);
redButtonFirst.disabled = true;
redButtonSecond.disabled = true;
if (localStorage.length === 0) {
  localStorage.setItem("tableIncome", JSON.stringify([]));
  localStorage.setItem("tableExpenses", JSON.stringify([]));
}

function check() {
  if (gridCheckFirst && gridCheckSecond) {
    load();
  }
}
function load() {
  let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
  let tableSecond = JSON.parse(localStorage.getItem("tableExpenses")) || [];
  for (let i = 0; i < tableFirst.length; i++) {
    gridOptions_1.api.applyTransaction({ add: [tableFirst[i]] });
  }
  for (let i = 0; i < tableSecond.length; i++) {
    gridOptions_2.api.applyTransaction({ add: [tableSecond[i]] });
  }
}
console.log(localStorage);

let textIncome = document.querySelector(".textIncome");
let numberIncome = document.querySelector(".numberIncome");
let dateIncome = document.querySelector(".dateIncome");
let textExpenses = document.querySelector(".textExpenses");
let numberExpenses = document.querySelector(".numberExpenses");
let dateExpenses = document.querySelector(".dateExpenses");

function addInfoFirst() {
  addIncomeCategory.value = "";
  addIncomeSum.value = "";
  addIncomeDate.value = "";
}
function addInfoSecond() {
  addExpenseCategory.value = "";
  addExpenseSum.value = "";
  addExpenseDate.value = "";
}

function addOkFirst() {
  const new_Row = {
    id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
      Math.random(1) * 1000
    )}`,
    category: addIncomeCategory.value,
    sum: addIncomeSum.value,
    data: new Date(addIncomeDate.value).toLocaleDateString("ru-RU"),
  };
  gridOptions_1.api.applyTransaction({
    add: [new_Row],
  });
  let currentData = JSON.parse(localStorage.getItem("tableIncome"));
  currentData.push(new_Row);
  localStorage.setItem("tableIncome", JSON.stringify(currentData));
  addIncomeCategory.value = "";
  addIncomeSum.value = "";
  addIncomeDate.value = "";
  console.log(localStorage);
}

function addOkSecond() {
  const new_Row = {
    id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
      Math.random(1) * 1000
    )}`,
    category: addExpenseCategory.value,
    sum: addExpenseSum.value,
    data: new Date(addExpenseDate.value).toLocaleDateString("ru-RU"),
  };
  gridOptions_2.api.applyTransaction({
    add: [new_Row],
  });
  let currentData = JSON.parse(localStorage.getItem("tableExpenses"));
  currentData.push(new_Row);
  localStorage.setItem("tableExpenses", JSON.stringify(currentData));
  addExpenseCategory.value = "";
  addExpenseSum.value = "";
  addExpenseDate.value = "";
  console.log(localStorage);
}

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

function redInfoFirst() {
  const selectedData1 = gridOptions_1.api.getSelectedRows();
  editIncomeCategory.value = selectedData1[0].category;
  editIncomeSum.value = selectedData1[0].sum;
  editIncomeDate.value = formatDate(selectedData1[0].data);
  console.log(editIncomeDate.value);
}
function redInfoSecond() {
  const selectedData2 = gridOptions_2.api.getSelectedRows();
  editExpenseCategory.value = selectedData2[0].category;
  editExpenseSum.value = selectedData2[0].sum;
  editExpenseDate.value = formatDate(selectedData2[0].data);
}
function redOkFirst() {
  const selectedData1 = gridOptions_1.api.getSelectedRows();
  selectedData1.forEach((row) => {
    row.category = editIncomeCategory.value;
    row.sum = editIncomeSum.value;
    row.data = new Date(editIncomeDate.value).toLocaleDateString("ru-RU");
  });
  gridOptions_1.api.applyTransaction({ update: selectedData1 });
  const allData = [];
  gridOptions_1.api.forEachNode((node) => allData.push(node.data));
  localStorage.setItem("tableIncome", JSON.stringify(allData));
}

function redOkSecond() {
  const selectedData2 = gridOptions_2.api.getSelectedRows();
  selectedData2.forEach((row) => {
    row.category = editExpenseCategory.value;
    row.sum = editExpenseSum.value;
    row.data = new Date(editExpenseDate.value).toLocaleDateString("ru-RU");
  });
  gridOptions_2.api.applyTransaction({ update: selectedData2 });
  const allData = [];
  gridOptions_2.api.forEachNode((node) => allData.push(node.data));
  localStorage.setItem("tableExpenses", JSON.stringify(allData));
  console.log(localStorage);
}

function deleteIncome() {
  const selectedData = gridOptions_1.api.getSelectedRows();
  gridOptions_1.api.applyTransaction({ remove: selectedData });
  let tableIncome = JSON.parse(localStorage.getItem("tableIncome"));
  const updatedData = tableIncome.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("tableIncome", JSON.stringify(updatedData));

  console.log(localStorage);
}

function deleteExpenses() {
  const selectedData = gridOptions_2.api.getSelectedRows();
  gridOptions_2.api.applyTransaction({ remove: selectedData });
  let tableExpenses = JSON.parse(localStorage.getItem("tableExpenses"));
  const updatedData = tableExpenses.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("tableExpenses", JSON.stringify(updatedData));

  console.log(localStorage);
}

// localStorage.clear();

let firstPart = document.querySelector(".firstPart");
let secondPart = document.querySelector(".secondPart");
secondPart.style.display = "none";
function buttonSwitch() {
  if (
    firstPart.style.display == "none" &&
    secondPart.style.display == "block"
  ) {
    firstPart.style.display = "block";
    secondPart.style.display = "none";
  } else {
    firstPart.style.display = "none";
    secondPart.style.display = "block";
  }
}
