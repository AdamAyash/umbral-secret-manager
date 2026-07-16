/* eslint-disable @typescript-eslint/no-unused-vars */

import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenticationService } from '../../features/authentication';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route, state) => {

  const userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);
  const router: Router = inject(Router);

  if (!userAuthenticationService.isUserAuthenticated())
    router.navigate(['/login']);

  return true;
};
