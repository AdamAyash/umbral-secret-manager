import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'umbral-error-message',
  imports: [MessageModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent {
  @Input({ required: true }) public control!: AbstractControl;
  @Input({ required: true }) public fieldLabel: string = '';

  public showErrorMessage(): boolean {
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  public errorMessage(): string {

    const errors: ValidationErrors | null = this.control.errors;

    if (!errors) {
      return '';
    }

    if (errors['email'])
      return this.emailErrorMessage();
    if (errors['required'])
      return this.requiredErrorMessage();
    if (errors['minlength'])
      return this.minLengthErrorMessage(errors['minlength'].requiredLength);

    return 'Invalid value.';
  }

  private emailErrorMessage(): string {
    return 'Please enter a valid email address.';
  }

  private requiredErrorMessage(): string {
    return `${this.fieldLabel} is required.`
  }

  private minLengthErrorMessage(requiredLength: number): string {
    return `${this.fieldLabel} must be at least ${requiredLength} characters.`;
  }
}
