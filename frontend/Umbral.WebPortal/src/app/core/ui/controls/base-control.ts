import { Directive, Input, OnInit } from "@angular/core";
import { BaseControlInteractor } from "../interactors/base-control-interactor";

@Directive()
export abstract class BaseControl<TInteractor extends BaseControlInteractor> implements OnInit {

    @Input() public _interactor?: TInteractor;

    public ngOnInit(): void {
        this._interactor?.initControl(this);
    }
}