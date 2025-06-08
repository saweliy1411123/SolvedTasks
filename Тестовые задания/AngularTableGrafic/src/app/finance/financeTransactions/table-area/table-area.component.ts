import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { GridApi, GridReadyEvent, ColDef, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AgGridModule, } from 'ag-grid-angular';
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
  @Input() public storageKey!: StorageKeys;
  @Input() public rowData: TableRow[] = [];
  @Output() public selectionChanged = new EventEmitter<TableRow[]>();

  private _gridApi: GridApi | null = null;

  public get gridApi(): GridApi | null {
    return this._gridApi;
  }

  constructor(private localStorageService: LocalStorageService) { }

  public columnDefs: ColDef<TableRow>[] = TABLE_COLUMN_DEFS;

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  public getRowId = (params: { data: TableRow }) => params.data.id;

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  public onGridReady(params: GridReadyEvent): void {
    this._gridApi = params.api;
  }
}

