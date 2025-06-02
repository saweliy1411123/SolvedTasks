import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from './form-field/form-field.component';
import { TableAreaComponent } from './table-area/table-area.component';
import { TableControlsComponent } from './table-controls/table-controls.component';
import { GridApi } from 'ag-grid-community';
import { LocalStorageService } from '../services/local-storage.service';
import { TableRow } from '../types/table-row.type';
import { StorageKeys } from '../types/storage-keys.enum';

@Component({
  selector: 'app-financeTransactions',
  imports: [FormFieldComponent, FormsModule, TableAreaComponent, TableControlsComponent],
  templateUrl: './financeTransactions.component.html'
})
export class FinanceTransactionsComponent {
  @ViewChild('inputSum') inputSum!: ElementRef;
  @ViewChild('inputDate') inputDate!: ElementRef;

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
  editingRow: TableRow | null = null;

  readonly incomeModalTittleCreate = "Добавление доходов";
  readonly expenseModalTittleCreate = "Добавление расходов";
  readonly incomeModalTittleEdit = "Редактирование доходов";
  readonly expenseModalTittleEdit = "Редактирование расходов";

  public StorageKeys = StorageKeys;

  constructor(private localStorageService: LocalStorageService) { }

  saveModalButton() {
    if (!this.incomeApi || !this.expensApi) {
      return;
    }

    let currentApi: GridApi | undefined = undefined;
    let storageKey: StorageKeys | undefined = undefined;

    if (this.currentGridId === 'incomeGrid') {
      currentApi = this.incomeApi;
      storageKey = StorageKeys.IncomeTableRows;
    } else if (this.currentGridId === 'expenseGrid') {
      currentApi = this.expensApi;
      storageKey = StorageKeys.ExpenseTableRows;
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
      const newRow: TableRow = {
        id: Date.now().toString(),
        category: this.category,
        sum: this.sum,
        data: this.date
      };
      currentApi.applyTransaction({ add: [newRow] });
    }

    const allData: TableRow[] = [];
    currentApi.forEachNode(node => allData.push(node.data));
    this.localStorageService.setItem(storageKey, allData);

    this.resetInputData();
  }

  private resetInputData() {
    this.category = '';
    this.sum = '';
    this.date = '';
    this.isEditMode = false;
    this.editingRow = null;
  }

  prepareAdd(gridType: 'incomeGrid' | 'expenseGrid') {
    this.currentGridId = gridType;
    this.isEditMode = false;
    this.modalTitle = gridType === 'incomeGrid' ? this.incomeModalTittleCreate : this.expenseModalTittleCreate;
    this.resetInputData();
  }

  onEditClick(gridType: 'incomeGrid' | 'expenseGrid') {
    const currentApi = gridType === 'incomeGrid' ? this.incomeApi : this.expensApi;
    const modalEditTitle = gridType === 'incomeGrid' ? this.incomeModalTittleEdit : this.expenseModalTittleEdit;

    const selectedData = currentApi?.getSelectedRows();
    if (selectedData && selectedData.length > 0) {
      this.currentGridId = gridType;
      this.isEditMode = true;
      this.modalTitle = modalEditTitle;
      this.editingRow = selectedData[0];
      this.category = selectedData[0].category;
      this.sum = selectedData[0].sum;
      this.date = selectedData[0].data;
    }
  }

  onDeleteClick(gridType: 'incomeGrid' | 'expenseGrid') {
    const currentApi = gridType === 'incomeGrid' ? this.incomeApi : this.expensApi;
    const storageKey = gridType === 'incomeGrid' ? StorageKeys.IncomeTableRows : StorageKeys.ExpenseTableRows;

    if (!currentApi) return;

    const selectedRows = currentApi.getSelectedRows();
    if (selectedRows.length > 0) {
      currentApi.applyTransaction({ remove: selectedRows });

      const allData: TableRow[] = [];
      currentApi.forEachNode(node => allData.push(node.data));
      this.localStorageService.setItem(storageKey, allData);
    }
  }
}
