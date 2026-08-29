/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {

  private readonly _toastService: ToastService = inject(ToastService)

  public handleError(error: any): void {
    console.debug(error);
    this._toastService.showError("Something went wrong on our end. Try refreshing, or come back in a few minutes");
  }

}
