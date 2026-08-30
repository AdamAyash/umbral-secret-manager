import { Directive, inject, Input, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast/toast.service";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QueryParameters } from "./query-parameters";

/**
 *  Base page  abstract class providing basic functionality for most pages.
 */
@Directive()
export abstract class BasePage implements OnInit {

    @Input({ required: true }) public pageTitle: string = '';
    @Input() public pageSubTitle: string = '';

    protected readonly toastService: ToastService = inject(ToastService);
    protected readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

    private readonly _router: Router = inject(Router);

    /*
     * 
     */
    protected abstract initialize(): void;

    /*
    * 
    */
    protected abstract loadData(): boolean;

    /*
    * 
    */
    protected abstract validate(): boolean;

    /**
     * On init implementation
     */
    public ngOnInit(): void {
        this.initialize();

        if (!this.loadData()) {
            //TODO explicit error or toast message + handle.
            throw new Error();
        }
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
    protected redirectTo(path: string, queryParameters?: NavigationExtras): void {
        this._router.navigate([path], queryParameters);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    protected getQueryParameter(queryParameter: QueryParameters) {
        return this._activatedRoute.snapshot.paramMap.get(queryParameter);
    }
}
