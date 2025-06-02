import { Injectable } from '@angular/core';
import { StorageKeys } from '../types/storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public readonly INCOME_TABLE_ROWS_KEY = StorageKeys.IncomeTableRows;
  public readonly EXPENSE_TABLE_ROWS_KEY = StorageKeys.ExpenseTableRows;

  constructor() { }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
} 