import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'umbral-action-button',
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
  public buttonText: InputSignal<string> = input.required();
  public buttonClicked: OutputEmitterRef<void> = output();

  protected onButtonClicked(): void {
    this.buttonClicked.emit();
  }
}
