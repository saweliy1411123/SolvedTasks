import { Component } from '@angular/core';
import { DateRangeComponent } from './date-range/date-range.component';


@Component({
  selector: 'app-date-checker',
  imports: [DateRangeComponent],
  templateUrl: './date-checker.component.html',
  styleUrl: './date-checker.component.scss'
})
export class DateCheckerComponent {
  incomeChartDateFrom(value: string) {
    console.log('Changed income chart start date');
  }

  incomeChartDateTo(value: string) {
    console.log('Changed income chart end date');
  }

  financeComparisonDateFrom(value: string) {
    console.log('Changed comparison start date');
  }

  financeComparisonDateTo(value: string) {
    console.log('Changed comparison end date');
  }

}
