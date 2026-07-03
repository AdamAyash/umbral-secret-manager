import { Component } from '@angular/core';
import { InputTextControlInteractor } from './interactor/input-text-control-interactor';
import { BaseInputControl } from '../../../core/ui';

@Component({
  selector: 'umbral-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class InputTextComponent extends BaseInputControl<InputTextControlInteractor> {

}
