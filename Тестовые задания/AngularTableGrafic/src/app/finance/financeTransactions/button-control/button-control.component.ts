import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridApi } from 'ag-grid-community';

interface TableRow {
  id: string;
  category: string;
  sum: string;
  data: string;
}

@Component({
  selector: 'app-button-control',
  imports: [],
  templateUrl: './button-control.component.html'
})
export class ButtonControlComponent {
  @Input() buttonText: string = '';
  @Input() buttonClass: string = 'btn-success';
  @Input() modalTarget: string = '';
  @Input() modalToggle: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() dataBsDismiss: string = '';
  @Input() incomeApi?: GridApi;
  @Input() expensApi?: GridApi;
  @Output() buttonClick = new EventEmitter<void>();
  @Output() editData = new EventEmitter<TableRow>();

  readonly incomeDataFromLocalStorage = "incomeTableRows";
  readonly expenseDataFromLocalStorage = "expenseTableRows";

  onClick() {
    this.buttonClick.emit();
  }

  prepareIncomeEdit() {
    const incomeSelectedData = this.incomeApi?.getSelectedRows();
    if (incomeSelectedData && incomeSelectedData.length > 0) {
      this.editData.emit({
        id: incomeSelectedData[0].id,
        category: incomeSelectedData[0].category,
        sum: incomeSelectedData[0].sum,
        data: incomeSelectedData[0].data
      });
    }
  }

  prepareExpenseEdit() {
    const selectedData = this.expensApi?.getSelectedRows();
    if (selectedData && selectedData.length > 0) {
      this.editData.emit({
        id: selectedData[0].id,
        category: selectedData[0].category,
        sum: selectedData[0].sum,
        data: selectedData[0].data
      });
    }
  }

  incomeDeleteButton() {
    const selectedData = this.incomeApi?.getSelectedRows();
    if (selectedData && selectedData.length > 0) {
      this.incomeApi?.applyTransaction({ remove: selectedData });
      let allData: TableRow[] = [];
      this.incomeApi?.forEachNode((node: any) => allData.push(node.data));
      localStorage.setItem(this.incomeDataFromLocalStorage, JSON.stringify(allData));
    }
  }

  expenseDeleteButton() {
    const selectedData = this.expensApi?.getSelectedRows();
    if (selectedData && selectedData.length > 0) {
      this.expensApi?.applyTransaction({ remove: selectedData });
      let allData: TableRow[] = [];
      this.expensApi?.forEachNode((node: any) => allData.push(node.data));
      localStorage.setItem(this.expenseDataFromLocalStorage, JSON.stringify(allData));
    }
  }
}
