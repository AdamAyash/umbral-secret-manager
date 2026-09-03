import { Component, inject } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { AuthenticationFormBuilderService } from '../../services/authentication-form-builder.service';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { IServerResponseProcessable } from '../../../../core/api/server-response-processable';
import { BasePage } from '../../../../core/ui/pages/base-page';
import { ErrorMessageComponent } from '../../../../shared/ui/components/error-message/error-message.component';
import { ProblemDetailsModel } from '../../../../core/api';
import { UserAuthenticationErrorCodes } from '../../services/user-authentication-error-codes';
import { SignInOutputModel } from '../../models/sign-in/sign-in-output.model';
import { SingInInputModel } from '../../models/sign-in/sign-in-input.model';
import { BasePageTemplateComponent } from "../../../../core/ui";

@Component({
  selector: 'umbral-sign-in-page',
  imports: [ReactiveFormsModule, InputTextModule, IconFieldModule, InputIconModule, PasswordModule, ErrorMessageComponent, BasePageTemplateComponent],
  templateUrl: './sign-in.page.html',
  styleUrl: './sign-in.page.css',
})
export class SignInPage extends BasePage {

  public signInForm!: FormGroup;

  private _authenticationFormBuilderService: AuthenticationFormBuilderService = inject(AuthenticationFormBuilderService);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  private _signInResponseProcessable: IServerResponseProcessable<SignInOutputModel, UserAuthenticationErrorCodes> = {
    processResult: (output: SignInOutputModel): boolean => {

      if (!output.userSession)
        return false;

      this._userAuthenticationService.saveUserSession(output.userSession)
      this.redirectTo('/dashboard');

      return true;
    },
    processError: (problemDetails: ProblemDetailsModel<UserAuthenticationErrorCodes>) => {
      if (problemDetails.errorCode === UserAuthenticationErrorCodes.InvalidCredentials)
        this.showError(problemDetails.title, problemDetails?.detail);
    }
  };

  public get email(): AbstractControl | null {
    return this.signInForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.signInForm.get('password');
  }

  protected override initialize(): void {
    this.signInForm = this._authenticationFormBuilderService.buildSignInForm();
  }

  protected override loadData(): boolean {
    return true;
  }

  protected override validate(): boolean {
    this.signInForm.markAllAsTouched();

    return this.signInForm.valid;
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    const signInInputModel = new SingInInputModel();
    signInInputModel.email = this.email?.value;
    signInInputModel.password = this.password?.value;

    this._userAuthenticationService.singIn(signInInputModel, this._signInResponseProcessable);
    this.password?.reset();

    return true;
  }
}
