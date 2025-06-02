import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef, GridOptions, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { LocalStorageService } from '../../services/local-storage.service';
import { TableRow } from '../../types/table-row.type';
import { TABLE_COLUMN_DEFS } from './table-area.const';
import { StorageKeys } from '../../types/storage-keys.enum';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-table-area',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table-area.component.html'
})
export class TableAreaComponent implements OnInit, AfterViewInit {
  @Input() public gridId: string = '';
  @Input() public isEditButtonDisabled: boolean = true;
  @Input() public storageKey!: StorageKeys;
  @Output() public isEditButtonDisabledChange = new EventEmitter<boolean>();
  @Output() public apiReady = new EventEmitter<GridApi>();
  @ViewChild('grid') public grid!: ElementRef;

  private gridApi: GridApi | undefined;

  constructor(private localStorageService: LocalStorageService) { }

  public columnDefs: ColDef<any, any>[] = TABLE_COLUMN_DEFS;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  public rowData: TableRow[] = [];

  public getRowId = (params: { data: TableRow }) => params.data.id;

  public gridOptions: GridOptions<TableRow> = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    rowData: this.rowData,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    onGridReady: this.onGridReady.bind(this),
    onSelectionChanged: this.onSelectionChanged.bind(this),
  };

  public ngOnInit(): void {
    this.loadData();
  }

  public ngAfterViewInit(): void {
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.apiReady.emit(params.api);
  }

  public onSelectionChanged(): void {
    const selectedRows = this.gridApi?.getSelectedRows();
    this.isEditButtonDisabled = !selectedRows || selectedRows.length !== 1;
    this.isEditButtonDisabledChange.emit(this.isEditButtonDisabled);
  }

  private loadData(): void {
    const data = this.localStorageService.getItem<TableRow[]>(this.storageKey) || [];
    this.rowData = [...data];
  }
}

