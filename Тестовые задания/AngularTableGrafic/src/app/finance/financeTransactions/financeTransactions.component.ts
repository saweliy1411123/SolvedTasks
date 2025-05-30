import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonControlComponent } from './button-control/button-control.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { TableComponent } from './table-area/table-area.component';
import { GridApi } from 'ag-grid-community';

interface TableRow {
  id: string;
  category: string;
  sum: string;
  data: string;
}

@Component({
  selector: 'app-financeTransactions',
  imports: [RouterLink, ButtonControlComponent, FormFieldComponent, FormsModule, TableComponent],
  templateUrl: './financeTransactions.component.html'
})
export class FinanceTransactionsComponent {
  @ViewChild('inputCategory') inputCategory!: ElementRef;
  @ViewChild('inputSum') inputSum!: ElementRef;
  @ViewChild('inputDate') inputDate!: ElementRef;
  @ViewChild('editIncomeButton') editIncomeButton!: ElementRef;
  @ViewChild('editExpenseButton') editExpenseButton!: ElementRef;

  public incomeApi: GridApi | undefined;
  public expensApi: GridApi | undefined;
  public isIncomeEditDisabled: boolean = true;
  public isExpenseEditDisabled: boolean = true;

  category: string = '';
  sum: string = '';
  date: string = '';
  isEditMode: boolean = false;
  currentGridId: string = '';
  public modalTitle: string = '';
  editingRow: any = null;

  title = 'AngularTableGrafic';
  readonly incomeDataFromLocalStorage = "incomeTableRows";
  readonly expenseDataFromLocalStorage = "expenseTableRows";
  readonly incomeModalTittleCreate = "Добавление доходов";
  readonly expenseModalTittleCreate = "Добавление расходов";
  readonly incomeModalTittleEdit = "Редактирование доходов";
  readonly expenseModalTittleEdit = "Редактирование расходов";

  saveModalButton() {
    if (!this.incomeApi || !this.expensApi) {
      return;
    }

    let currentApi: GridApi | undefined = undefined;
    let storageKey: string = '';

    if (this.currentGridId === 'incomeGrid') {
      currentApi = this.incomeApi;
      storageKey = this.incomeDataFromLocalStorage;
    } else if (this.currentGridId === 'expenseGrid') {
      currentApi = this.expensApi;
      storageKey = this.expenseDataFromLocalStorage;
    }

    if (!currentApi || !storageKey) {
      console.error('Не удалось определить API или ключ localStorage для сохранения данных');
      return;
    }

    if (this.isEditMode && this.editingRow) {
      this.editingRow.category = this.category;
      this.editingRow.sum = this.sum;
      this.editingRow.data = this.date;

      currentApi.applyTransaction({ update: [this.editingRow] });

    } else {
      const newRow = {
        id: Date.now().toString(),
        category: this.category,
        sum: this.sum,
        data: this.date
      };
      currentApi.applyTransaction({ add: [newRow] });
    }

    const allData: TableRow[] = [];
    currentApi.forEachNode(node => allData.push(node.data));
    localStorage.setItem(storageKey, JSON.stringify(allData));

    this.resetInputData();
  }

  private resetInputData() {
    this.category = '';
    this.sum = '';
    this.date = '';
    this.isEditMode = false;
    this.editingRow = null;
  }

  prepareIncomeAdd() {
    this.currentGridId = 'incomeGrid';
    this.isEditMode = false;
    this.modalTitle = 'Добавление дохода';
    this.resetInputData();
  }

  prepareExpenseAdd() {
    this.currentGridId = 'expenseGrid';
    this.isEditMode = false;
    this.modalTitle = 'Добавление расхода';
    this.resetInputData();
  }

  prepareIncomeEdit(data: any) {
    this.currentGridId = 'incomeGrid';
    this.isEditMode = true;
    this.modalTitle = 'Редактирование дохода';
    this.editingRow = data;
    this.category = data.category;
    this.sum = data.sum;
    this.date = data.data;
  }

  prepareExpenseEdit(data: any) {
    this.currentGridId = 'expenseGrid';
    this.isEditMode = true;
    this.modalTitle = 'Редактирование расхода';
    this.editingRow = data;
    this.category = data.category;
    this.sum = data.sum;
    this.date = data.data;
  }

  incomeDeleteButton() {
    if (!this.incomeApi) return;

    const selectedRows = this.incomeApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.incomeApi.applyTransaction({ remove: selectedRows });

      const allData: TableRow[] = [];
      this.incomeApi.forEachNode(node => allData.push(node.data));
      localStorage.setItem(this.incomeDataFromLocalStorage, JSON.stringify(allData));
    }
  }

  expenseDeleteButton() {
    if (!this.expensApi) return;

    const selectedRows = this.expensApi.getSelectedRows();
    if (selectedRows.length > 0) {
      this.expensApi.applyTransaction({ remove: selectedRows });

      const allData: TableRow[] = [];
      this.expensApi.forEachNode(node => allData.push(node.data));
      localStorage.setItem(this.expenseDataFromLocalStorage, JSON.stringify(allData));
    }
  }

  onClick() {}
}
