import { Component } from '@angular/core';
import { BasePage } from '../../core/ui/pages/base-page';
import { InputTextComponent } from "../../shared/components/text-input/text-input.component";
import { InputTextControlInteractor } from '../../shared/components/text-input/interactor/input-text-control-interactor';

@Component({
  selector: 'umbral-login-page',
  imports: [InputTextComponent],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage extends BasePage {

  public textInputControlInteractor?: InputTextControlInteractor;

  protected override initialize(): void {

    this.textInputControlInteractor = new InputTextControlInteractor();
    this.textInputControlInteractor.label = "Email";
    this.textInputControlInteractor.placeHolder = "Enter your email address";
  }

  protected override validate(): boolean {
    return true;
  }
}