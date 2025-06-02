import { Component } from '@angular/core';
import { ChartContainerWithDateSelectorComponent } from './chart-container-with-date-selector/chart-container-with-date-selector.component';

@Component({
  selector: 'app-analyticsCharts',
  imports: [
    ChartContainerWithDateSelectorComponent,
  ],
  templateUrl: './analyticsCharts.component.html'
})
export class AnalyticsChartsComponent {

}
