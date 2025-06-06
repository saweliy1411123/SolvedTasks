export interface ChartDataItem {
  data: string;
  sum: number;
  category: string;
}

export enum TransactionType {
  Income = 1,
  Expense = 2,
}

export interface AllDatesListItem {
  date: string;
  type: TransactionType;
  sum: number;
  category: string;
} 