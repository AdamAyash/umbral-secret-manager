import { BaseControl } from "../controls/base-control";

export class BaseControlInteractor {
    private _control?: BaseControl<this>
    private _isDisabled: boolean = false;

    public initControl(control: BaseControl<this>): void {
        this._control = control;
    }

    public get isDisabled(): boolean {
        return this._isDisabled;
    }

    public set isDisabled(value: boolean) {
        this._isDisabled = value;
    }
}