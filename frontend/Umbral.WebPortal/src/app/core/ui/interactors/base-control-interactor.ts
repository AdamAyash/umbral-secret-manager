import { BaseControl } from "../controls/base-control";

export class BaseControlInteractor {
    private _control?: BaseControl<this>

    public initControl(control: BaseControl<this>): void {
        this._control = control;
    }
}