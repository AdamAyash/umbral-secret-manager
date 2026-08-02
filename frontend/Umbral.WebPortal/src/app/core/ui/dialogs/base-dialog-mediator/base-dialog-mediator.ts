import { Directive, signal, WritableSignal } from "@angular/core";
import { Observable } from "rxjs";

/**
 * A dialog controller acting as a mediator between the client and the dialog.
 */
@Directive()
export class BaseDialogMediator<TDialogInputModel, TDialogOutputModel> {

    private _isDialogVisible: WritableSignal<boolean> = signal(false);

    private _dialogInputModel?: TDialogInputModel;

    public get isDialogVisible(): boolean {
        return this._isDialogVisible();
    }

    public set isDialogVisible(isDialogVisible: boolean) {
        this._isDialogVisible.set(isDialogVisible);
    }

    public openDialog(inputModel: TDialogInputModel): Observable<TDialogOutputModel> {
        this._isDialogVisible.set(true);
        this._dialogInputModel = inputModel;
    }

    public closeDialog(): void {
        this._isDialogVisible.set(false);
    }
}