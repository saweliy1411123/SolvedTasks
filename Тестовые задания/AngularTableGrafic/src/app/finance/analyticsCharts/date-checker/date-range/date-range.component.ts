import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-range',
  imports: [],
  template: `<input class="dateElements mx-2 border border-2 border-dark p-2 rounded" type="date" (change)="onChange($event)" />`,
  styleUrl: './date-range.component.scss'
})
export class DateRangeComponent {
  @Output() valueChange = new EventEmitter<string>();
  
  incomeChartDateFrom() {
    console.log('Changed income chart start date');
  }

  incomeChartDateTo() {
    console.log('Changed income chart end date');
  }

  financeComparisonDateFrom() {
    console.log('Changed comparison start date');
  }

  financeComparisonDateTo() {
    console.log('Changed comparison end date');
  }

  onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
