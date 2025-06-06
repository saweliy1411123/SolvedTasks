import { ChartDataItem, AllDatesListItem, TransactionType } from '../../../types/chart-data.type';
import { DateRange } from '../../../types/date-range.type';

export function processChartData(
  incomeTableData: ChartDataItem[],
  expenseTableData: ChartDataItem[],
  dateRange: DateRange,
  formatDateFn: (date: string | number | Date) => string
): { categoryNameList: string[]; incomeValuesList: number[]; expenseValuesList: number[] } {
  let allDatesList: AllDatesListItem[] = [];

  for (let i = 0; i < incomeTableData.length; i++) {
    allDatesList.push({
      date: incomeTableData[i].data,
      type: TransactionType.Income,
      sum: incomeTableData[i].sum,
      category: incomeTableData[i].category,
    });
  }
  for (let i = 0; i < expenseTableData.length; i++) {
    allDatesList.push({
      date: expenseTableData[i].data,
      type: TransactionType.Expense,
      sum: expenseTableData[i].sum,
      category: expenseTableData[i].category,
    });
  }
  allDatesList.sort((a, b) => a.date.localeCompare(b.date));
  const filteredData: AllDatesListItem[] = [];
  for (let i = 0; i < allDatesList.length; i++) {
    if (
      allDatesList[i].date >= dateRange.from &&
      allDatesList[i].date <= dateRange.to
    ) {
      filteredData.push(allDatesList[i]);
    }
  }
  const categoryNameList: string[] = [];
  const incomeValuesList: number[] = [];
  const expenseValuesList: number[] = [];

  for (let i = 0; i < filteredData.length; i++) {
    const date = filteredData[i].date;
    const type = filteredData[i].type;
    const sum = filteredData[i].sum;

    if (
      i + 1 < filteredData.length &&
      filteredData[i].date === filteredData[i + 1].date
    ) {
      categoryNameList.push(formatDateFn(date));
      incomeValuesList.push(filteredData[i].sum);
      expenseValuesList.push(filteredData[i + 1].sum);
      i += 1;
    } else {
      categoryNameList.push(formatDateFn(date));
      if (type === TransactionType.Expense) {
        incomeValuesList.push(0);
        expenseValuesList.push(sum);
      } else {
        incomeValuesList.push(sum);
        expenseValuesList.push(0);
      }
    }
  }

  return { categoryNameList, incomeValuesList, expenseValuesList };
} 