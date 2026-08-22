import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";

@Component({
  selector: 'umbral-search-bar',
  imports: [InputText, IconField, InputIcon],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {

  public placeHolder: InputSignal<string> = input('');
  public filter: OutputEmitterRef<string> = output();

  protected onChangeValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filter.emit(value);
  }
}
