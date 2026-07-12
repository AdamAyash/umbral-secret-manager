import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UmbralPreset } from './core/theme/umbral-preset';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
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
