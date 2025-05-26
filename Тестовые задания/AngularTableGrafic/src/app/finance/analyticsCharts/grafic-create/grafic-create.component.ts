import { Component } from '@angular/core';

@Component({
  selector: 'app-grafic-create',
  imports: [],
  templateUrl: './grafic-create.component.html',
  styleUrl: './grafic-create.component.scss'
})
export class GraficCreateComponent {
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

}
