import { Directive, Input, OnInit } from "@angular/core";

/**
 *  Base page  abstract class providing basic functionality for most pages.
 */
@Directive()
export abstract class BasePage implements OnInit {

    @Input({ required: true }) public pageTitle: string = '';
    @Input() public pageSubTitle: string = '';

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
