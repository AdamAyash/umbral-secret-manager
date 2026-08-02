import { Directive, inject, Input, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast/toast.service";
import { Router } from '@angular/router';

/**
 *  Base page  abstract class providing basic functionality for most pages.
 */
@Directive()
export abstract class BasePage implements OnInit {

    @Input({ required: true }) public pageTitle: string = '';
    @Input() public pageSubTitle: string = '';

    protected readonly toastService: ToastService = inject(ToastService);

    private readonly _router: Router = inject(Router);

    /*
     * 
     */
    protected abstract initialize(): void;

    /*
    * 
    */
    protected abstract loadData(): void;

    /*
    * 
    */
    protected abstract validate(): boolean;

    /**
     * On init implementation
     */
    public ngOnInit(): void {
        this.initialize();
        this.loadData();
    }

    /**
     * An on submit event handler
     * @returns boolean
     */
    protected onSubmit(): boolean {
        if (!this.validate())
            return false;

        return true;
    }

    /**
     * 
     * @param path 
     */
    protected redirectTo(path: string): void {
        this._router.navigate([path]);
    }
}
