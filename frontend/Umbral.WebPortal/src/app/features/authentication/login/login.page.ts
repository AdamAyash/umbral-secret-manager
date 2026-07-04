import { Component } from '@angular/core';
import { BasePage } from '../../../core/ui/pages/base-page';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'umbral-login-page',
  imports: [ReactiveFormsModule, InputTextModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage extends BasePage {

  public loginForm: FormGroup = this.createLoginForm();

  protected override initialize(): void {
    this.loginForm.get('email')?.markAllAsDirty();
  }

  protected override validate(): boolean {
    if (!this.loginForm.valid) {
    }

    this.loginForm.reset();
    return true;
  }

  private createLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
  }
}
