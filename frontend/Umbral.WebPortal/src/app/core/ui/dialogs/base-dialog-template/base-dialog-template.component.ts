import { Component, input, InputSignal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { BaseDialogController } from '../base-dialog-controller/base-dialog-controller';


@Component({
  selector: 'umbral-base-dialog-template',
  imports: [DialogModule],
  templateUrl: './base-dialog-template.component.html',
  styleUrl: './base-dialog-template.component.css',
})
export class BaseDialogTemplateComponent<TDialogInputModel, TDialogOutputModel> {
  public title: InputSignal<string> = input.required();
  public dialogController: InputSignal<BaseDialogController<TDialogInputModel, TDialogOutputModel>> = input.required();
}
