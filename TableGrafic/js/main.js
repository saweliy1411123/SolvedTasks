let gridApi;
redIncome.disabled = true;
redExpenses.disabled = true;
let gridCheckFirst = false;
let gridCheckSecond = false;
let addIncomeText = "Добавление доходов";
let addExpensesText = "Добавление расходов";
let redIncomeText = "Редактирование доходов";
let redExpensesText = "Редактирование расходов";
let textIncome = document.querySelector(".textIncome");
let numberIncome = document.querySelector(".numberIncome");
let dateIncome = document.querySelector(".dateIncome");
let textExpenses = document.querySelector(".textExpenses");
let numberExpenses = document.querySelector(".numberExpenses");
let dateExpenses = document.querySelector(".dateExpenses");

const gridOptionsFirstTable = {
  rowData: [],
  columnDefs: [{ field: "category" }, { field: "sum" }, { field: "data" }],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    gridOptionsFirstTable.api = params.api;
    gridCheckFirst = true;
    check();
  },
  onSelectionChanged: () => {
    let selectedRowsFirst = gridOptionsFirstTable.api.getSelectedRows().length;
    if (selectedRowsFirst === 1) {
      redIncome.disabled = false;
    } else {
      redIncome.disabled = true;
    }
  },
};

const gridOptionsSecondTable = {
  rowData: [],
  columnDefs: [{ field: "category" }, { field: "sum" }, { field: "data" }],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    gridOptionsSecondTable.api = params.api;
    gridCheckSecond = true;
    check();
  },
  onSelectionChanged: () => {
    let selectedRowsSecond =
      gridOptionsSecondTable.api.getSelectedRows().length;
    if (selectedRowsSecond === 1) {
      redExpenses.disabled = false;
    } else {
      redExpenses.disabled = true;
    }
  },
};

const myGridfirst = document.querySelector("#myGridfirst");
const myGridsecond = document.querySelector("#myGridsecond");
agGrid.createGrid(myGridfirst, gridOptionsFirstTable);
agGrid.createGrid(myGridsecond, gridOptionsSecondTable);

if (localStorage.length === 0) {
  localStorage.setItem("tableIncome", JSON.stringify([]));
  localStorage.setItem("tableExpenses", JSON.stringify([]));
}

function check() {
  if (gridCheckFirst && gridCheckSecond) {
    loadLocalStorage();
  }
}
function loadLocalStorage() {
  let tableFirst = JSON.parse(localStorage.getItem("tableIncome")) || [];
  let tableSecond = JSON.parse(localStorage.getItem("tableExpenses")) || [];
  for (let i = 0; i < tableFirst.length; i++) {
    gridOptionsFirstTable.api.applyTransaction({ add: [tableFirst[i]] });
  }
  for (let i = 0; i < tableSecond.length; i++) {
    gridOptionsSecondTable.api.applyTransaction({ add: [tableSecond[i]] });
  }
}
console.log(localStorage);

function addInfoFirst() {
  addIncomeModalLabel.textContent = addIncomeText;
  addIncomeCategory.value = "";
  addIncomeSum.value = "";
  addIncomeDate.value = "";
}
function addInfoSecond() {
  addIncomeModalLabel.textContent = addExpensesText;
  addIncomeCategory.value = "";
  addIncomeSum.value = "";
  addIncomeDate.value = "";
}

function okForModals() {
  switch (true) {
    case addIncomeModalLabel.textContent == addIncomeText:
      const newRowIncome = {
        id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
          Math.random(1) * 1000
        )}`,
        category: addIncomeCategory.value,
        sum: addIncomeSum.value,
        data: formatDate(addIncomeDate.value),
      };
      gridOptionsFirstTable.api.applyTransaction({
        add: [newRowIncome],
      });
      let currentDataIncome = JSON.parse(localStorage.getItem("tableIncome"));
      currentDataIncome.push(newRowIncome);
      localStorage.setItem("tableIncome", JSON.stringify(currentDataIncome));
      addIncomeCategory.value = "";
      addIncomeSum.value = "";
      addIncomeDate.value = "";
      console.log(localStorage);
      break;
    case addIncomeModalLabel.textContent == addExpensesText:
      const newRowExpenses = {
        id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
          Math.random(1) * 1000
        )}`,
        category: addIncomeCategory.value,
        sum: addIncomeSum.value,
        data: formatDate(addIncomeDate.value),
      };
      gridOptionsSecondTable.api.applyTransaction({
        add: [newRowExpenses],
      });
      let currentDataExpenses = JSON.parse(
        localStorage.getItem("tableExpenses")
      );
      currentDataExpenses.push(newRowExpenses);
      localStorage.setItem(
        "tableExpenses",
        JSON.stringify(currentDataExpenses)
      );
      addIncomeCategory.value = "";
      addIncomeSum.value = "";
      addIncomeDate.value = "";
      console.log(localStorage);
      break;
    case addIncomeModalLabel.textContent == redIncomeText:
      const selectedData1 = gridOptionsFirstTable.api.getSelectedRows();
      let allDataIncome = [];
      selectedData1.forEach((row) => {
        row.category = addIncomeCategory.value;
        row.sum = addIncomeSum.value;
        row.data = formatDate(addIncomeDate.value);
      });
      gridOptionsFirstTable.api.applyTransaction({ update: selectedData1 });
      gridOptionsFirstTable.api.forEachNode((node) =>
        allDataIncome.push(node.data)
      );
      localStorage.setItem("tableIncome", JSON.stringify(allDataIncome));
      break;
    case addIncomeModalLabel.textContent == redExpensesText:
      const selectedData2 = gridOptionsSecondTable.api.getSelectedRows();
      let allDataExpenses = [];
      selectedData2.forEach((row) => {
        row.category = addIncomeCategory.value;
        row.sum = addIncomeSum.value;
        row.data = formatDate(addIncomeDate.value);
      });
      gridOptionsSecondTable.api.applyTransaction({ update: selectedData2 });
      gridOptionsSecondTable.api.forEachNode((node) =>
        allDataExpenses.push(node.data)
      );
      localStorage.setItem("tableExpenses", JSON.stringify(allDataExpenses));
      break;
  }
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
  addIncomeModalLabel.textContent = redIncomeText;
  const selectedData1 = gridOptionsFirstTable.api.getSelectedRows();
  addIncomeCategory.value = selectedData1[0].category;
  addIncomeSum.value = selectedData1[0].sum;
  addIncomeDate.value = selectedData1[0].data;
}
function redInfoSecond() {
  const selectedData2 = gridOptionsSecondTable.api.getSelectedRows();
  addIncomeModalLabel.textContent = redExpensesText;
  addIncomeCategory.value = selectedData2[0].category;
  addIncomeSum.value = selectedData2[0].sum;
  addIncomeDate.value = selectedData2[0].data;
}

function deleteIncome() {
  const selectedData = gridOptionsFirstTable.api.getSelectedRows();
  gridOptionsFirstTable.api.applyTransaction({ remove: selectedData });
  let tableIncome = JSON.parse(localStorage.getItem("tableIncome"));
  const updatedData = tableIncome.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("tableIncome", JSON.stringify(updatedData));

  console.log(localStorage);
}

function deleteExpenses() {
  const selectedData = gridOptionsSecondTable.api.getSelectedRows();
  gridOptionsSecondTable.api.applyTransaction({ remove: selectedData });
  let tableExpenses = JSON.parse(localStorage.getItem("tableExpenses"));
  const updatedData = tableExpenses.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("tableExpenses", JSON.stringify(updatedData));

  console.log(localStorage);
}

let tablePartHTML = document.querySelector(".tablePartHTML");
let graficPartHTML = document.querySelector(".graficPartHTML");
graficPartHTML.style.display = "none";
function buttonSwitch() {
  if (
    tablePartHTML.style.display == "none" &&
    graficPartHTML.style.display == "block"
  ) {
    tablePartHTML.style.display = "block";
    graficPartHTML.style.display = "none";
  } else {
    tablePartHTML.style.display = "none";
    graficPartHTML.style.display = "block";
  }
}
