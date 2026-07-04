import { BaseControlInteractor } from "./base-control-interactor";

export abstract class BaseInputControlInteractor extends BaseControlInteractor {

    private _label: string = "";
    private _textValue: string = "";
    private _placeHolder: string = ""
    private _isRequired: boolean = false;

    public get label(): string {
        return this._label;
    }

    public set label(value: string) {
        this._label = value;
    }

    public get textValue(): string {
        return this._textValue;
    }

    public set textValue(value: string) {
        this._textValue = value;
    }

    public get placeHolder(): string {
        return this._placeHolder;
    }

    public set placeHolder(value: string) {
        this._placeHolder = value;
    }

    public get isRequired(): boolean {
        return this._isRequired;
    }

    public set isRequired(value: boolean) {
        this._isRequired = value;
    }

    public abstract transferDataToInteractor(): void;
} 