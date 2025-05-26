import { Routes } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';
import { FinanceTransactionsComponent } from './finance/financeTransactions/financeTransactions.component';
import { AnalyticsChartsComponent } from './finance/analyticsCharts/analyticsCharts.component';

export const routes: Routes = [
  {
    path: 'finance',
    component: FinanceComponent,
    children: [
      { path: 'financeTransactions', component: FinanceTransactionsComponent },
      { path: 'analyticsCharts', component: AnalyticsChartsComponent },
      { path: '', redirectTo: 'financeTransactions', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/finance/financeTransactions', pathMatch: 'full' }
];
