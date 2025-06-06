import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-finance',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './finance.component.html'
})
export class FinanceComponent implements OnInit {
  public readonly buttonText: string = 'Переключиться';

  get currentRouteLink(): string[] {
    if (this.router.url.includes('/finance/analyticsCharts')) {
      return ['/finance/financeTransactions'];
    } else {
      return ['/finance/analyticsCharts'];
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {});
  }
}
