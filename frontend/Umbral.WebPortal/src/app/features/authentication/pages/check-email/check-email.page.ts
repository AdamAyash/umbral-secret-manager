import { Component } from '@angular/core';
import { BasePage } from '../../../../core/ui';

@Component({
  selector: 'umbral-check-email-page',
  imports: [],
  templateUrl: './check-email.page.html',
  styleUrl: './check-email.page.css',
})
export class CheckEmailPage extends BasePage {

  protected override initialize(): void {
    //
  }

  protected override validate(): boolean {
    return true;
  }
}
