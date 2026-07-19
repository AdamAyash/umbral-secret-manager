import { Directive, signal, WritableSignal } from "@angular/core";

@Directive()
export class BaseDialogController<TDialogInputModel, TDialogOutputModel> {
    private _isDialogVisible: WritableSignal<boolean> = signal(false);

    public get isDialogVisible(): boolean {
        return this._isDialogVisible();
    }

    public set isDialogVisible(isDialogVisible: boolean) {
        this._isDialogVisible.set(isDialogVisible);
    }

    public showDialog(): void {
        this._isDialogVisible.set(true);
    }

    public closeDialog(): void {
        this._isDialogVisible.set(false);
    }
}