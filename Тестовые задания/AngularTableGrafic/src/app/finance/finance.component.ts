import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-finance',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './finance.component.html'
})
export class FinanceComponent implements OnInit {
  public buttonText: string = '';
  public currentRouteLink: string[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateButtonState();
    });
    this.updateButtonState();
  }

  private updateButtonState(): void {
    if (this.router.url.includes('/finance/analyticsCharts')) {
      this.buttonText = 'Переключиться';
      this.currentRouteLink = ['/finance/financeTransactions'];
    } else {
      this.buttonText = 'Переключиться';
      this.currentRouteLink = ['/finance/analyticsCharts'];
    }
  }
}
