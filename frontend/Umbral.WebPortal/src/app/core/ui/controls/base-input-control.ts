import { Directive } from "@angular/core";
import { BaseInputControlInteractor } from "../interactors";
import { BaseControl } from "./base-control";
import { ControlValueAccessor } from "@angular/forms";

@Directive()
export class BaseInputControl<TInteractor extends BaseInputControlInteractor>
    extends BaseControl<TInteractor> implements ControlValueAccessor {

    private _label: string = "";
    private _textValue: string = "";

    public writeValue(obj: any): void {

    }
    public registerOnChange(fn: any): void {

    }
    public registerOnTouched(fn: any): void {

    }
    public setDisabledState?(isDisabled: boolean): void {

    }
}