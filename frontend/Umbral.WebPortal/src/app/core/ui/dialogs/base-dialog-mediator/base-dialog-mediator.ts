import { Directive, signal, WritableSignal } from "@angular/core";
import { Observable, Subject } from "rxjs";

/**
 * A dialog controller acting as a mediator between the client and the dialog.
 */
@Directive()
export class BaseDialogMediator<TDialogInputModel, TDialogOutputModel> {

    private _isDialogVisible: WritableSignal<boolean> = signal(false);
    private _dialogInputModel?: TDialogInputModel;
    private _dialogOutputSubject?: Subject<TDialogOutputModel | undefined>;

    public get isDialogVisible(): boolean {
        return this._isDialogVisible();
    }

    public set isDialogVisible(isDialogVisible: boolean) {
        this._isDialogVisible.set(isDialogVisible);
    }

    public openDialog(inputModel: TDialogInputModel): Observable<TDialogOutputModel | undefined> {
        this._dialogOutputSubject?.complete();
        this._dialogOutputSubject = new Subject<TDialogOutputModel | undefined>();
        this._isDialogVisible.set(true);
        this._dialogInputModel = inputModel;

        return this._dialogOutputSubject.asObservable();
    }

    public closeDialog(): void {
        this._isDialogVisible.set(false);
    }

    public transferData(output?: TDialogOutputModel): void {
        if (!this._dialogOutputSubject)
            return;

        this._isDialogVisible.set(false);
        this._dialogOutputSubject.next(output);
        this._dialogOutputSubject.complete();
        this._dialogOutputSubject = undefined;
    }
}
