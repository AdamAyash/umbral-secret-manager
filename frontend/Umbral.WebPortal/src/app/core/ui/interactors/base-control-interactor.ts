import { BaseControl } from "../controls/base-control";

export class BaseControlInteractor {
    private _control?: BaseControl<BaseControlInteractor>

    public initControl(control: BaseControl<BaseControlInteractor>): void {
        this._control = control;
    }
}