import { Directive, inject, Input, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast/toast.service";

/**
 *  Base page  abstract class providing basic functionality for most pages.
 */
@Directive()
export abstract class BasePage implements OnInit {

    @Input({ required: true }) public pageTitle: string = '';
    @Input() public pageSubTitle: string = '';

    protected toastService: ToastService = inject(ToastService);

    protected abstract initialize(): void;
    protected abstract validate(): boolean;

    public ngOnInit(): void {
        this.initialize();
    }

    protected onSubmit(): boolean {
        if (!this.validate())
            return false;

        return true;
    }
}
