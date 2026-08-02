import { Directive, inject, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { BaseDialogMediator } from '../base-dialog-mediator/base-dialog-mediator';
import { ToastService } from '../../../services/toast/toast.service';

@Directive()
export abstract class BaseDialog<TDialogInputModel, TDialogOutputModel> implements OnInit, OnDestroy {

    public ngOnDestroy(): void {
        console.log('Dialog is closed');
    }

    public baseDialogController: InputSignal<BaseDialogMediator<TDialogInputModel, TDialogOutputModel>> = input.required();
    protected _toastService: ToastService = inject(ToastService);

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
