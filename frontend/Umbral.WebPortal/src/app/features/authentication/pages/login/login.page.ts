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
import { LoginOutputModel } from '../../models/login/login-output.model';
import { LoginInputModel } from '../../models/login/login-input.model';
import { ProblemDetailsModel } from '../../../../core/api';
import { RouterLink } from '@angular/router';
import { UserAuthenticationErrorCodes } from '../../services/user-authentication-error-codes';

@Component({
  selector: 'umbral-login-page',
  imports: [ReactiveFormsModule, InputTextModule, RouterLink, IconFieldModule, InputIconModule, PasswordModule, ErrorMessageComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage extends BasePage {

  public loginForm!: FormGroup;

  private _authenticationFormBuilderService: AuthenticationFormBuilderService = inject(AuthenticationFormBuilderService);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  private _loginResponseProcessable: IServerResponseProcessable<LoginOutputModel, UserAuthenticationErrorCodes> = {
    processResult: (output: LoginOutputModel): boolean => {

      if (!output.userSession)
        return false;

      this._userAuthenticationService.saveUserSession(output.userSession)
      this.redirectTo('/dashboard');

      return true;
    },
    processError: (problemDetails: ProblemDetailsModel<UserAuthenticationErrorCodes>) => {
      if (problemDetails.errorCode === UserAuthenticationErrorCodes.InvalidCredentials)
        this.toastService.showError(problemDetails.title, problemDetails?.detail);
    }
  };

  public get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  protected override initialize(): void {
    this.loginForm = this._authenticationFormBuilderService.buildLoginForm();
  }

  protected override validate(): boolean {
    this.loginForm.markAllAsTouched();

    return this.loginForm.valid;
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    const loginInputModel = new LoginInputModel();
    loginInputModel.email = this.email?.value;
    loginInputModel.password = this.password?.value;

    this._userAuthenticationService.login(loginInputModel, this._loginResponseProcessable);
    this.password?.reset();

    return true;
  }
}
