import { Component } from '@angular/core';
import { BaseInputControl } from '../../../core/ui/controls/base-input-control';
import { InputTextControlInteractor } from './interactor/input-text-control-interactor';

@Component({
  selector: 'umbral-input-text',
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
})
export class InputTextComponent extends BaseInputControl<InputTextControlInteractor> {

}
