import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'umbral-table-action-button',
  imports: [],
  templateUrl: './table-action-button.component.html',
  styleUrl: './table-action-button.component.css',
})
export class TableActionButtonComponent {
  public buttonText: InputSignal<string> = input.required();
  public icon: InputSignal<string> = input.required();
  public isDangerZoneAction: InputSignal<boolean> = input(false);
  public buttonClicked: OutputEmitterRef<void> = output();

  protected onButtonClicked(): void {
    this.buttonClicked.emit();
  }
}
