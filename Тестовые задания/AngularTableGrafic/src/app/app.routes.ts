import { Routes } from '@angular/router';
import { FinanceComponent } from './finance/finance.component';

export const routes: Routes = [
  {
    path: 'finance',
    component: FinanceComponent,
    children: [
      {
        path: 'financeTransactions',
        loadComponent: () => import('./finance/financeTransactions/financeTransactions.component').then(m => m.FinanceTransactionsComponent)
      },
      {
        path: 'analyticsCharts',
        loadComponent: () => import('./finance/analyticsCharts/analyticsCharts.component').then(m => m.AnalyticsChartsComponent)
      },
      { path: '', redirectTo: 'financeTransactions', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/finance/financeTransactions', pathMatch: 'full' }
];
