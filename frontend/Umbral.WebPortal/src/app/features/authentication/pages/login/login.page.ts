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

@Component({
  selector: 'umbral-login-page',
  imports: [ReactiveFormsModule, InputTextModule, IconFieldModule, InputIconModule, PasswordModule, ErrorMessageComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage extends BasePage {

  public loginForm!: FormGroup;

  private _authenticationFormBuilderService: AuthenticationFormBuilderService = inject(AuthenticationFormBuilderService);
  private _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  private _loginResponseProcessable: IServerResponseProcessable<LoginOutputModel> = {
    processResult: (output: LoginOutputModel): boolean => {
      return true;
    },
    processError: () => {
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

    this._userAuthenticationService.login(new LoginInputModel(), this._loginResponseProcessable);

    return true;
  }
}
