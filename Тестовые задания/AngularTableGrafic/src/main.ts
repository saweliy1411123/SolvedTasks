import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AgGridModule } from 'ag-grid-angular';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    AgGridModule
  ]
}).catch(err => console.error(err));