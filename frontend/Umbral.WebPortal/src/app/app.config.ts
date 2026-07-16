import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UmbralPreset } from './core/theme/umbral-preset';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    MessageService,
    providePrimeNG({
      theme: {
        preset: UmbralPreset,
        options: {
          darkModeSelector: '.umbral-dark'
        }
      }
    })
  ]
};
