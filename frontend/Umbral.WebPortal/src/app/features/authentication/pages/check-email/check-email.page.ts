import { Component, inject } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { ResendEmailVerificationInputModel } from '../../models/resend-email-verification/resend-email-verification-input.model';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { ResendEmailVerificationOutputModel } from '../../models/resend-email-verification/resend-email-verification-output.model';
import { UserAuthenticationErrorCodes } from '../../services/user-authentication-error-codes';

/**
 * Check your email page
 */
@Component({
  selector: 'umbral-check-email-page',
  imports: [],
  templateUrl: './check-email.page.html',
  styleUrl: './check-email.page.css',
})
export class CheckEmailPage extends BasePage {

  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  private _resendEmailVerificationResponseProcessable: IServerResponseProcessable<ResendEmailVerificationOutputModel, UserAuthenticationErrorCodes> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processResult: (output: ResendEmailVerificationOutputModel): boolean => {
      this.toastService.showInfo('Email Resent', 'A new verification email has been sent. Please, check your inbox.');
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<UserAuthenticationErrorCodes>) => {
      //
    }
  };

  protected override initialize(): void {
    //
  }

  protected override loadData(): boolean {
    return true;
  }

  protected override validate(): boolean {
    return true;
  }

  protected override onSubmit(): boolean {

    const resendEmailVerificationInputModel = new ResendEmailVerificationInputModel();
    resendEmailVerificationInputModel.email = '';

    this._userAuthenticationService.resendEmailVerification(resendEmailVerificationInputModel, this._resendEmailVerificationResponseProcessable);

    return true;
  }
}
