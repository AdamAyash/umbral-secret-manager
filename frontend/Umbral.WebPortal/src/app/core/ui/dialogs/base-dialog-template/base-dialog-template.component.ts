import { Component, input, InputSignal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BaseDialogMediator } from '../base-dialog-mediator/base-dialog-mediator';


@Component({
  selector: 'umbral-base-dialog-template',
  imports: [DialogModule],
  templateUrl: './base-dialog-template.component.html',
  styleUrl: './base-dialog-template.component.css',
})
export class BaseDialogTemplateComponent<TDialogInputModel, TDialogOutputModel> {

  public title: InputSignal<string> = input.required();
  public dialogController: InputSignal<BaseDialogMediator<TDialogInputModel, TDialogOutputModel>> = input.required();
}
