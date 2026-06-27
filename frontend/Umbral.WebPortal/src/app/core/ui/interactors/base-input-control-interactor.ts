import { BaseControlInteractor } from "./base-control-interactor";

export class BaseInputControlInteractor extends BaseControlInteractor {

    private _label: string = "";
    private _textValue: string = "";

    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }
}