import { Directive, input, InputSignal } from '@angular/core';
import { BaseDialogController } from '../base-dialog-controller/base-dialog-controller';

@Directive()
export class BaseDialog<TDialogInputModel, TDialogOutputModel> {
    public baseDialogController: InputSignal<BaseDialogController<TDialogInputModel, TDialogOutputModel>> = input.required();
}
