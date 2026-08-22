import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { InputText } from "primeng/inputtext";
@Component({
  selector: 'umbral-search-bar',
  imports: [InputText],
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
