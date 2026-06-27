import { Component } from '@angular/core';
import { BasePage } from '../../core/ui/pages/base-page';

@Component({
  selector: 'umbral-login-page',
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage extends BasePage {

  protected override initialize(): void {
  }
  protected override validate(): boolean {
    return true;
  }
}
