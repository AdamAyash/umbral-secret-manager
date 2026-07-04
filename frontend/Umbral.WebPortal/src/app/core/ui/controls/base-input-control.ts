import { Directive } from "@angular/core";
import { BaseInputControlInteractor } from "../interactors";
import { BaseControl } from "./base-control";
import { ControlValueAccessor } from "@angular/forms";

@Directive()
export class BaseInputControl<TInteractor extends BaseInputControlInteractor> extends BaseControl<TInteractor> implements ControlValueAccessor {

    private _label: string = "";
    private _textValue: string = "";
    private _placeHolder: string = ""

    private _onTouched?: () => void;
    public onChange?: (value: string) => void;

    public writeValue(text: string): void {
        this._textValue = text;
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.interactor!.isDisabled = isDisabled;
    }
}