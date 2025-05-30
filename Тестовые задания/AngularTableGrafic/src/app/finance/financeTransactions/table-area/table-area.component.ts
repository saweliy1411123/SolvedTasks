// @ts-nocheck
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableRow {
  id: string;
  category: string;
  sum: string;
  data: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table-area.component.html'
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() gridId: string = '';
  @Input() isEditButtonDisabled: boolean = true;
  @Input() incomeApi?: GridApi;
  @Input() expensApi?: GridApi;
  @Output() isEditButtonDisabledChange = new EventEmitter<boolean>();
  @Output() apiReady = new EventEmitter<GridApi>();
  @ViewChild('grid') grid!: ElementRef;

  private gridApi: GridApi | undefined;
  private tableReadyCheck: boolean = false;
  public readonly incomeDataFromLocalStorage = "incomeTableRows";
  public readonly expenseDataFromLocalStorage = "expenseTableRows";

  columnDefs: ColDef[] = [
    {
      field: 'checkbox',
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left'
    },
    { field: 'category', headerName: 'Category', sortable: true, filter: true },
    { field: 'sum', headerName: 'Sum', sortable: true, filter: true },
    { field: 'data', headerName: 'Data', sortable: true, filter: true }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  rowData: any[] = [];

  getRowId = (params: any) => params.data.id;

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    rowData: this.rowData,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    onGridReady: this.onGridReady.bind(this),
    onSelectionChanged: this.onSelectionChanged.bind(this),
  };

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.checkReadyTables();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.apiReady.emit(params.api);
    if (this.gridId === 'incomeGrid') {
      this.incomeApi = params.api;
    } else if (this.gridId === 'expenseGrid') {
      this.expensApi = params.api;
    }
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi?.getSelectedRows();
    this.isEditButtonDisabled = !selectedRows || selectedRows.length !== 1;
    this.isEditButtonDisabledChange.emit(this.isEditButtonDisabled);
  }

  private loadData() {
    const storageKey = this.gridId === 'incomeGrid' 
      ? this.incomeDataFromLocalStorage 
      : this.expenseDataFromLocalStorage;
    
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    this.rowData = [...data];
  }

  private checkReadyTables() {
    if (this.gridId === 'incomeGrid') {
      this.tableReadyCheck = true;
    } else if (this.gridId === 'expenseGrid') {
      this.tableReadyCheck = true;
    }
  }
}

