import { Directive, input, InputSignal, OnInit } from "@angular/core";
import { BaseControlInteractor } from "../interactors/base-control-interactor";

@Directive()
export abstract class BaseControl<TInteractor extends BaseControlInteractor> implements OnInit {

    public _interactor: InputSignal<TInteractor> = input.required();

    public ngOnInit(): void {
        this._interactor().initControl(this);
    }
}