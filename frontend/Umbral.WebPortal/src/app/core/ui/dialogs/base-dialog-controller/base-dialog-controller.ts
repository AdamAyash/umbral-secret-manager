export class BaseDialogController<TDialogInputModel, TDialogOutputModel> {
    private _isDialogVisible: boolean = false;

    public get isDialogVisible(): boolean {
        return this._isDialogVisible;
    }

    public showDialog(): void {
        this._isDialogVisible = true;
    }

    public closeDialog(): void {
        this._isDialogVisible = false;
    }
}