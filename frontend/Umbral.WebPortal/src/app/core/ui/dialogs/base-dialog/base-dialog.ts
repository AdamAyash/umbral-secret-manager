import { Directive, inject, input, InputSignal, OnInit } from '@angular/core';
import { BaseDialogMediator } from '../base-dialog-mediator/base-dialog-mediator';
import { ToastService } from '../../../services/toast/toast.service';

@Directive()
export abstract class BaseDialog<TDialogInputModel, TDialogOutputModel> implements OnInit, OnDestroy {

    public ngOnDestroy(): void {
        console.log('Dialog is closed');
    }

    public baseDialogMediator: InputSignal<BaseDialogMediator<TDialogInputModel, TDialogOutputModel>> = input.required();
    protected _toastService: ToastService = inject(ToastService);

    public ngOnInit(): void {
        this.initialize();
    }

    protected abstract initialize(): void;

    protected onCloseDialog(): void {
        this.baseDialogMediator().closeDialog();
    }

    public transferData(outputModel: TDialogOutputModel): void {
        this.baseDialogMediator().transferData(outputModel);
    }

    protected validateData(): boolean {
        return true;
    }

    protected onSubmit(): boolean {
        return this.validateData();
    }
}
