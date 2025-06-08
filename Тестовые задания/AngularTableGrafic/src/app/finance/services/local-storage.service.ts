import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableRow } from '../types/table-row.type';
import { ChartDataItem } from '../types/chart-data.type';
import { STORAGE_KEYS, INITIAL_DATA} from '../constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public readonly INCOME_TABLE_ROWS_KEY = STORAGE_KEYS.INCOME_TABLE_ROWS;
  public readonly EXPENSE_TABLE_ROWS_KEY = STORAGE_KEYS.EXPENSE_TABLE_ROWS;

  private incomeDataSubject = new BehaviorSubject<TableRow[]>(INITIAL_DATA.TABLE_ROWS);
  private expenseDataSubject = new BehaviorSubject<TableRow[]>(INITIAL_DATA.TABLE_ROWS);

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    const incomeData = this.getTableRows(this.INCOME_TABLE_ROWS_KEY);
    const expenseData = this.getTableRows(this.EXPENSE_TABLE_ROWS_KEY);
    
    this.incomeDataSubject.next(incomeData);
    this.expenseDataSubject.next(expenseData);
  }

  getIncomeData(): Observable<TableRow[]> {
    return this.incomeDataSubject.asObservable();
  }

  getExpenseData(): Observable<TableRow[]> {
    return this.expenseDataSubject.asObservable();
  }

  updateIncomeData(data: TableRow[]): void {
    this.setTableRows(this.INCOME_TABLE_ROWS_KEY, data);
    this.incomeDataSubject.next(data);
  }

  updateExpenseData(data: TableRow[]): void {
    this.setTableRows(this.EXPENSE_TABLE_ROWS_KEY, data);
    this.expenseDataSubject.next(data);
  }

  getTableRows(key: string): TableRow[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : INITIAL_DATA.TABLE_ROWS;
  }

  getChartData(key: string): ChartDataItem[] {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : INITIAL_DATA.CHART_DATA;
  }

  setTableRows(key: string, value: TableRow[]): void {
    localStorage.setItem(key, JSON.stringify(value));
    if (key === this.INCOME_TABLE_ROWS_KEY) {
      this.incomeDataSubject.next(value);
    } else if (key === this.EXPENSE_TABLE_ROWS_KEY) {
      this.expenseDataSubject.next(value);
    }
  }

  setChartData(key: string, value: ChartDataItem[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    if (key === this.INCOME_TABLE_ROWS_KEY) {
      this.incomeDataSubject.next(INITIAL_DATA.TABLE_ROWS);
    } else if (key === this.EXPENSE_TABLE_ROWS_KEY) {
      this.expenseDataSubject.next(INITIAL_DATA.TABLE_ROWS);
    }
  }
} 
