import { StorageKeys } from '../types/storage-keys.enum';
import { TableRow } from '../types/table-row.type';
import { ChartDataItem } from '../types/chart-data.type';

// Ключи для localStorage
export const STORAGE_KEYS = {
  INCOME_TABLE_ROWS: StorageKeys.IncomeTableRows,
  EXPENSE_TABLE_ROWS: StorageKeys.ExpenseTableRows
} as const;

// Начальные значения для данных
export const INITIAL_DATA = {
  TABLE_ROWS: [] as TableRow[],
  CHART_DATA: [] as ChartDataItem[]
} as const;

// Типы данных
export const DATA_TYPES = {
  TABLE_ROW: 'TableRow',
  CHART_DATA_ITEM: 'ChartDataItem'
} as const;

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  STORAGE_ERROR: 'Ошибка при работе с хранилищем',
  INVALID_DATA: 'Некорректные данные',
  API_NOT_FOUND: 'Не удалось определить API или ключ localStorage для сохранения данных'
} as const;
