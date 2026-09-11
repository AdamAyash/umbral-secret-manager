import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { SetupStatusService } from '../services/setup-status-service/setup-status.service';

/**
 * Prevents access to normal application routes until the initial administrator
 * account has been created.
 */
export const initialSetupGuard: CanActivateFn = () => {
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId))
        return true;

    const setupStatusService: SetupStatusService = inject(SetupStatusService);
    const router = inject(Router);

    return setupStatusService.getRequiresInitialSetup().pipe(
        map((status) => !status.requiresInitialSetup || router.createUrlTree(['/setup']))
    );
};
