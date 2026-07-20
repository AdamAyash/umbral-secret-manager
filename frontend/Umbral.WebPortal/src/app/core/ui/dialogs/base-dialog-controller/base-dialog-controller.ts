import { Directive, signal, WritableSignal } from "@angular/core";

/**
 * A dialog controller acting as a mediator between the client and the dialog.
 */
@Directive()
export class BaseDialogController<TDialogInputModel, TDialogOutputModel> {

    private _isDialogVisible: WritableSignal<boolean> = signal(false);
    private _dialogInputModel?: TDialogInputModel;
    private _dialogOutputModel?: TDialogOutputModel;

    public get isDialogVisible(): boolean {
        return this._isDialogVisible();
    }

    public set isDialogVisible(isDialogVisible: boolean) {
        this._isDialogVisible.set(isDialogVisible);
    }

    public openDialog(inputModel: TDialogInputModel,
        outputModel: TDialogOutputModel): void {
        this._isDialogVisible.set(true);

        this._dialogInputModel = inputModel;
        this._dialogOutputModel = outputModel;
    }

    public closeDialog(): void {
        this._isDialogVisible.set(false);
    }
}