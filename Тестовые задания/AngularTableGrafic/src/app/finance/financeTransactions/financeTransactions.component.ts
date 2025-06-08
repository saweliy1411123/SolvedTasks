import { Component, ViewChild, OnInit } from '@angular/core';
import { TableAreaComponent } from './table-area/table-area.component';
import { TableControlsComponent } from './table-controls/table-controls.component';
import { GridApi } from 'ag-grid-community';
import { LocalStorageService } from '../services/local-storage.service';
import { TableRow } from '../types/table-row.type';
import { StorageKeys } from '../types/storage-keys.enum';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FinanceModalContentComponent } from '../financeModal/financeModalContent.component';

@Component({
  selector: 'app-financeTransactions',
  imports: [TableAreaComponent, TableControlsComponent],
  templateUrl: './financeTransactions.component.html'
})
export class FinanceTransactionsComponent implements OnInit {
  @ViewChild('incomeTableArea') incomeTableArea!: TableAreaComponent;
  @ViewChild('expenseTableArea') expenseTableArea!: TableAreaComponent;

  public isIncomeEditDisabled: boolean = true;
  public isExpenseEditDisabled: boolean = true;

  public incomeRowData: TableRow[] = [];
  public expenseRowData: TableRow[] = [];

  bsModalRef?: BsModalRef;

  readonly incomeModalTittleCreate = "Добавление доходов";
  readonly expenseModalTittleCreate = "Добавление расходов";
  readonly incomeModalTittleEdit = "Редактирование доходов";
  readonly expenseModalTittleEdit = "Редактирование расходов";

  public StorageKeys = StorageKeys;

  constructor(private localStorageService: LocalStorageService,
              private bsModalService: BsModalService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.incomeRowData = this.localStorageService.getTableRows(StorageKeys.IncomeTableRows);
    this.expenseRowData = this.localStorageService.getTableRows(StorageKeys.ExpenseTableRows);
  }

  prepareAdd(gridType: 'incomeGrid' | 'expenseGrid') {
    const initialState = {
      title: gridType === 'incomeGrid' ? this.incomeModalTittleCreate : this.expenseModalTittleCreate,
    };
    this.bsModalRef = this.bsModalService.show(FinanceModalContentComponent, { initialState });

    this.bsModalRef.content.save.subscribe((newRow: TableRow) => {
      let currentApi: GridApi | null = null;
      let storageKey: StorageKeys | null = null;

      if (gridType === 'incomeGrid') {
        currentApi = this.incomeTableArea.gridApi;
        storageKey = StorageKeys.IncomeTableRows;
      } else if (gridType === 'expenseGrid') {
        currentApi = this.expenseTableArea.gridApi;
        storageKey = StorageKeys.ExpenseTableRows;
      }

      if (!currentApi || !storageKey) {
        console.error('Не удалось определить API или ключ localStorage для сохранения данных');
        return;
      }

      currentApi.applyTransaction({ add: [newRow] });

      const allData: TableRow[] = [];
      currentApi.forEachNode(node => allData.push(node.data));
      this.localStorageService.setTableRows(storageKey, allData);
    });
  }

  onEditClick(gridType: 'incomeGrid' | 'expenseGrid') {
    const currentApi = gridType === 'incomeGrid' ? this.incomeTableArea.gridApi : this.expenseTableArea.gridApi;
    const modalEditTitle = gridType === 'incomeGrid' ? this.incomeModalTittleEdit : this.expenseModalTittleEdit;

    const selectedData = currentApi?.getSelectedRows();
    if (selectedData && selectedData.length > 0) {
      const initialState = {
        title: modalEditTitle,
        category: selectedData[0].category,
        sum: selectedData[0].sum,
        date: selectedData[0].data,
        editingRow: selectedData[0]
      };
      this.bsModalRef = this.bsModalService.show(FinanceModalContentComponent, { initialState });

      this.bsModalRef.content.save.subscribe((updatedRow: TableRow) => {
        let storageKey: StorageKeys | null = null;

        if (gridType === 'incomeGrid') {
          storageKey = StorageKeys.IncomeTableRows;
        } else if (gridType === 'expenseGrid') {
          storageKey = StorageKeys.ExpenseTableRows;
        }

        if (!currentApi || !storageKey) {
          console.error('Не удалось определить API или ключ localStorage для сохранения данных');
          return;
        }

        currentApi.applyTransaction({ update: [updatedRow] });

        const allData: TableRow[] = [];
        currentApi.forEachNode(node => allData.push(node.data));
        this.localStorageService.setTableRows(storageKey, allData);
      });
    }
  }

  onDeleteClick(gridType: 'incomeGrid' | 'expenseGrid') {
    const currentApi = gridType === 'incomeGrid' ? this.incomeTableArea.gridApi : this.expenseTableArea.gridApi;
    const storageKey = gridType === 'incomeGrid' ? StorageKeys.IncomeTableRows : StorageKeys.ExpenseTableRows;

    if (!currentApi) return;

    const selectedRows = currentApi.getSelectedRows();
    if (selectedRows.length > 0) {
      currentApi.applyTransaction({ remove: selectedRows });

      const allData: TableRow[] = [];
      currentApi.forEachNode(node => allData.push(node.data));
      this.localStorageService.setTableRows(storageKey, allData);
    }
  }

  onGridSelectionChanged(gridType: 'incomeGrid' | 'expenseGrid', selectedRows: TableRow[]): void {
    if (gridType === 'incomeGrid') {
      this.isIncomeEditDisabled = selectedRows.length !== 1;
    } else if (gridType === 'expenseGrid') {
      this.isExpenseEditDisabled = selectedRows.length !== 1;
    }
  }
}
