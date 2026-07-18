import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BasePage } from '../../../../core/ui';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { ErrorMessageComponent } from "../../../../shared/ui/components/error-message/error-message.component";
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { AuthenticationFormBuilderService } from '../../services/authentication-form-builder.service';
import { InputTextModule } from 'primeng/inputtext';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { SignUpInputModel } from '../../models/sign-up/sign-up-input.model';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { UserAuthenticationErrorCodes } from '../../services/user-authentication-error-codes';
import { SignUpOutputModel } from '../../models/sign-up/sign-up-output.model';

@Component({
  selector: 'umbral-sign-up-page',
  imports: [IconField, InputIcon, RouterLink, ErrorMessageComponent, InputTextModule, ReactiveFormsModule],
  templateUrl: './sign-up.page.html',
  styleUrl: './sign-up.page.css',
})
export class SignUpPage extends BasePage {

  public signUpForm!: FormGroup;

  private _authenticationFormBuilderService: AuthenticationFormBuilderService = inject(AuthenticationFormBuilderService);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  private _signUpResponseProcessable: IServerResponseProcessable<SignUpOutputModel, UserAuthenticationErrorCodes> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processResult: (output: SignUpOutputModel): boolean => {
      this.redirectTo('check-email');
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<UserAuthenticationErrorCodes>) => {
      //
    }
  };

  public get email(): AbstractControl | null {
    return this.signUpForm.get('email');
  }

  protected override initialize(): void {
    this.signUpForm = this._authenticationFormBuilderService.buildSignUpForm();
  }

  protected override validate(): boolean {
    this.signUpForm.markAllAsTouched();

    return this.signUpForm.valid;
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    const signUpInputModel = new SignUpInputModel();
    signUpInputModel.email = this.email?.value;

    this._userAuthenticationService.signUp(signUpInputModel, this._signUpResponseProcessable);

    return true;
  }

}
