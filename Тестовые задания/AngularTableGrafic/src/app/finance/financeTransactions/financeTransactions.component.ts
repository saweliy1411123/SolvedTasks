import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonControlComponent } from './button-control/button-control.component';
import { ColumnTitleComponent } from './column-title/column-title.component';
import { FormFieldComponent } from './form-field/form-field.component';

@Component({
  selector: 'app-financeTransactions',
  imports: [RouterLink, ButtonControlComponent, ColumnTitleComponent, FormFieldComponent, FormsModule],
  templateUrl: './financeTransactions.component.html',
  styleUrl: './financeTransactions.component.scss'
})
export class FinanceTransactionsComponent {
  title = 'AngularTableGrafic';
  category: string = '';
  sum: number = 0;
  date: string = '';

  prepareIncomeAdd() {
    console.log('Preparing to add income...');
  }

  prepareIncomeEdit() {
    console.log('Preparing to edit income...');
  }

  incomeDeleteButton() {
    console.log('Deleting income...');
  }

  prepareExpenseAdd() {
    console.log('Preparing to add expense...');
  }

  prepareExpenseEdit() {
    console.log('Preparing to edit expense...');
  }

  expenseDeleteButton() {
    console.log('Deleting expense...');
  }

  saveModalButton() {
    console.log('Saving modal...', { category: this.category, sum: this.sum, date: this.date });
  }

}
