import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'umbral-page-action-button',
  imports: [],
  templateUrl: './page-action-button.component.html',
  styleUrl: './page-action-button.component.css',
})
export class PageActionButtonComponent {
  public buttonText: InputSignal<string> = input.required();
  public buttonClicked: OutputEmitterRef<void> = output();

  protected onButtonClicked(): void {
    this.buttonClicked.emit();
  }
}
