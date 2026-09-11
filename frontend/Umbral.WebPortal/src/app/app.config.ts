import { isPlatformBrowser } from '@angular/common';
import { ApplicationConfig, ErrorHandler, inject, PLATFORM_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UmbralPreset } from './core/theme/umbral-preset';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { GlobalErrorHandlerService } from './core/services/global-error-handler/global-error-handler.service';
import { SetupStatusService } from './core/services/setup-status-service/setup-status.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);

      if (!isPlatformBrowser(platformId))
        return;

      const setupStatusService = inject(SetupStatusService);
      return setupStatusService.getRequiresInitialSetup();
    }),
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
