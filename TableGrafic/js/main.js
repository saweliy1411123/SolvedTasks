let gridApi;
editIncomeButton.disabled = true;
editExpenseButton.disabled = true;

let incomeTableReadyCheck = false;
let expenseTableReadyCheck = false;

const incomeModalTittleCreate = "Добавление доходов";
const expenseModalTittleCreate = "Добавление расходов";
const incomeModalTittleEdit = "Редактирование доходов";
const expenseModalTittleEdit = "Редактирование расходов";

const incomeGridOptions = {
  rowData: [],
  columnDefs: [
    { field: "category" },
    { field: "sum" },
    {
      field: "data",
      valueFormatter: (params) => {
        if (!params.value) return "";
        const d = new Date(params.value);
        if (isNaN(d)) return params.value;
        let day = String(d.getDate()).padStart(2, "0");
        let month = String(d.getMonth() + 1).padStart(2, "0");
        let year = d.getFullYear();
        return `${day}.${month}.${year}`;
      },
    },
  ],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    incomeGridOptions.api = params.api;
    incomeTableReadyCheck = true;
    checkReadyTables();
  },
  onSelectionChanged: () => {
    let incomeSelectedRows = incomeGridOptions.api.getSelectedRows().length;
    if (incomeSelectedRows === 1) {
      editIncomeButton.disabled = false;
    } else {
      editIncomeButton.disabled = true;
    }
  },
};

const expenseGridOptions = {
  rowData: [],
  columnDefs: [
    { field: "category" },
    { field: "sum" },
    {
      field: "data",
      valueFormatter: (params) => {
        if (!params.value) return "";
        const d = new Date(params.value);
        if (isNaN(d)) return params.value;
        let day = String(d.getDate()).padStart(2, "0");
        let month = String(d.getMonth() + 1).padStart(2, "0");
        let year = d.getFullYear();
        return `${day}.${month}.${year}`;
      },
    },
  ],
  rowSelection: { mode: "multiRow" },
  onGridReady: function (params) {
    expenseGridOptions.api = params.api;
    expenseTableReadyCheck = true;
    checkReadyTables();
  },
  onSelectionChanged: () => {
    let expenseSelectedRows = expenseGridOptions.api.getSelectedRows().length;
    if (expenseSelectedRows === 1) {
      editExpenseButton.disabled = false;
    } else {
      editExpenseButton.disabled = true;
    }
  },
};

const incomeGrid = document.querySelector("#incomeGrid");
const expenseGrid = document.querySelector("#expenseGrid");
agGrid.createGrid(incomeGrid, incomeGridOptions);
agGrid.createGrid(expenseGrid, expenseGridOptions);

if (localStorage.length === 0) {
  localStorage.setItem("incomeTableRows", JSON.stringify([]));
  localStorage.setItem("expenseTableRows", JSON.stringify([]));
}

function checkReadyTables() {
  if (incomeTableReadyCheck && expenseTableReadyCheck) {
    loadLocalStorage();
  }
}
function loadLocalStorage() {
  let incomeTableData =
    JSON.parse(localStorage.getItem("incomeTableRows")) || [];
  let expenseTableData =
    JSON.parse(localStorage.getItem("expenseTableRows")) || [];
  for (let i = 0; i < incomeTableData.length; i++) {
    incomeGridOptions.api.applyTransaction({ add: [incomeTableData[i]] });
  }
  for (let i = 0; i < expenseTableData.length; i++) {
    expenseGridOptions.api.applyTransaction({ add: [expenseTableData[i]] });
  }
}

function incomeResetCreateForm() {
  incomeModalTittle.textContent = incomeModalTittleCreate;
  inputCategory.value = "";
  inputSum.value = "";
  inputDate.value = "";
}
function expenseResetCreateForm() {
  incomeModalTittle.textContent = incomeModalTittleCreate;
  inputCategory.value = "";
  inputSum.value = "";
  inputDate.value = "";
}
function incomeResetEditForm() {
  incomeModalTittle.textContent = incomeModalTittleEdit;
  const incomeSelectedData = incomeGridOptions.api.getSelectedRows();
  inputCategory.value = incomeSelectedData[0].category;
  inputSum.value = incomeSelectedData[0].sum;
  inputDate.value = incomeSelectedData[0].data;
}
function expenseResetEditForm() {
  const selectedData2 = expenseGridOptions.api.getSelectedRows();
  incomeModalTittle.textContent = expenseModalTittleEdit;
  inputCategory.value = selectedData2[0].category;
  inputSum.value = selectedData2[0].sum;
  inputDate.value = selectedData2[0].data;
}

function saveModalButton() {
  switch (true) {
    case incomeModalTittle.textContent == incomeModalTittleCreate:
      const newRowIncome = {
        id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
          Math.random(1) * 1000
        )}`,
        category: inputCategory.value,
        sum: inputSum.value,
        data: inputDate.value,
      };
      incomeGridOptions.api.applyTransaction({
        add: [newRowIncome],
      });
      let currentDataIncome = JSON.parse(
        localStorage.getItem("incomeTableRows")
      );
      currentDataIncome.push(newRowIncome);
      localStorage.setItem(
        "incomeTableRows",
        JSON.stringify(currentDataIncome)
      );
      inputCategory.value = "";
      inputSum.value = "";
      inputDate.value = "";
      break;
    case incomeModalTittle.textContent == incomeModalTittleCreate:
      const newRowExpenses = {
        id: `${Math.round(Math.random(1) * 1000)}_${Math.round(
          Math.random(1) * 1000
        )}`,
        category: inputCategory.value,
        sum: inputSum.value,
        data: inputDate.value,
      };
      expenseGridOptions.api.applyTransaction({
        add: [newRowExpenses],
      });
      let currentDataExpenses = JSON.parse(
        localStorage.getItem("expenseTableRows")
      );
      currentDataExpenses.push(newRowExpenses);
      localStorage.setItem(
        "expenseTableRows",
        JSON.stringify(currentDataExpenses)
      );
      inputCategory.value = "";
      inputSum.value = "";
      inputDate.value = "";
      break;
    case incomeModalTittle.textContent == incomeModalTittleEdit:
      const incomeSelectedData = incomeGridOptions.api.getSelectedRows();
      let allDataIncome = [];
      incomeSelectedData.forEach((row) => {
        row.category = inputCategory.value;
        row.sum = inputSum.value;
        row.data = inputDate.value;
      });
      incomeGridOptions.api.applyTransaction({ update: incomeSelectedData });
      incomeGridOptions.api.forEachNode((node) =>
        allDataIncome.push(node.data)
      );
      localStorage.setItem("incomeTableRows", JSON.stringify(allDataIncome));
      break;
    case incomeModalTittle.textContent == expenseModalTittleEdit:
      const selectedData2 = expenseGridOptions.api.getSelectedRows();
      let allDataExpenses = [];
      selectedData2.forEach((row) => {
        row.category = inputCategory.value;
        row.sum = inputSum.value;
        row.data = inputDate.value;
      });
      expenseGridOptions.api.applyTransaction({ update: selectedData2 });
      expenseGridOptions.api.forEachNode((node) =>
        allDataExpenses.push(node.data)
      );
      localStorage.setItem("expenseTableRows", JSON.stringify(allDataExpenses));
      break;
  }
}

function incomeDeleteButton() {
  const selectedData = incomeGridOptions.api.getSelectedRows();
  incomeGridOptions.api.applyTransaction({ remove: selectedData });
  let incomeTableRows = JSON.parse(localStorage.getItem("incomeTableRows"));
  const updatedData = incomeTableRows.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("incomeTableRows", JSON.stringify(updatedData));
}

function expenseDeleteButton() {
  const selectedData = expenseGridOptions.api.getSelectedRows();
  expenseGridOptions.api.applyTransaction({ remove: selectedData });
  let expenseTableRows = JSON.parse(localStorage.getItem("expenseTableRows"));
  const updatedData = expenseTableRows.filter(
    (item) => !selectedData.some((row) => row.id === item.id)
  );

  localStorage.setItem("expenseTableRows", JSON.stringify(updatedData));
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
