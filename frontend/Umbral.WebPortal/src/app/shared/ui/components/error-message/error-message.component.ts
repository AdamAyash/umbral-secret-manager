import { Component, input, InputSignal } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'umbral-error-message',
  imports: [MessageModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {

  public control: InputSignal<AbstractControl> = input.required();
  public fieldLabel: InputSignal<string> = input.required();

  public showErrorMessage(): boolean {
    return this.control().invalid && (this.control().touched || this.control().dirty);
  }

  public errorMessage(): string {

    const validationErrors: ValidationErrors | null = this.control().errors;

    if (!validationErrors) {
      return '';
    }

    if (validationErrors['email'])
      return this.emailErrorMessage();
    if (validationErrors['required'])
      return this.requiredErrorMessage();
    if (validationErrors['minlength'])
      return this.minLengthErrorMessage(validationErrors['minlength'].requiredLength);

    return 'Invalid value.';
  }

  private emailErrorMessage(): string {
    return 'Please enter a valid email address.';
  }

  private requiredErrorMessage(): string {
    return `${this.fieldLabel()} is required.`
  }

  private minLengthErrorMessage(requiredLength: number): string {
    return `${this.fieldLabel()} must be at least ${requiredLength} characters.`;
  }
}
