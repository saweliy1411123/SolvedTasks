import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-income-date-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income-date-range.component.html'
})
export class IncomeDateRangeComponent {
  public dateFrom: string = '';
  public dateTo: string = '';

  public onDateChange(): void {
    console.log('Income date range changed:', this.dateFrom, this.dateTo);
  }
} 