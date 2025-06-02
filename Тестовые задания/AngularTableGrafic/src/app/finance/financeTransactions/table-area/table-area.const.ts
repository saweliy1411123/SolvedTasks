import { ColDef } from 'ag-grid-community';

export const TABLE_COLUMN_DEFS: ColDef[] = [
  {
    field: 'checkbox',
    headerName: '',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: 'left' as const
  },
  { field: 'category', headerName: 'Category', sortable: true, filter: true },
  { field: 'sum', headerName: 'Sum', sortable: true, filter: true },
  { field: 'data', headerName: 'Data', sortable: true, filter: true }
]; 