import { BaseInputControlInteractor } from "../interactors";
import { BaseControl } from "./base-control";

export class BaseInputControl<TInteractor extends BaseInputControlInteractor>
    extends BaseControl<TInteractor> {

    private _label: string = "";
    private _textValue: string = "";
}