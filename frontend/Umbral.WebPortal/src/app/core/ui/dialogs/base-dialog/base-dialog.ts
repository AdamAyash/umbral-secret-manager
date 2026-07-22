import { Directive, input, InputSignal, OnInit } from '@angular/core';
import { BaseDialogController } from '../base-dialog-controller/base-dialog-controller';

@Directive()
export abstract class BaseDialog<TDialogInputModel, TDialogOutputModel> implements OnInit {

    public baseDialogController: InputSignal<BaseDialogController<TDialogInputModel, TDialogOutputModel>> = input.required();

    public ngOnInit(): void {
        this.initialize();
    }

    protected abstract initialize(): void;

    protected onCloseDialog(): void {
        this.baseDialogController().closeDialog();
    }

    protected validateData(): boolean {
        return true;
    }

    protected onSubmit(): boolean {
        return this.validateData();
    }
}
