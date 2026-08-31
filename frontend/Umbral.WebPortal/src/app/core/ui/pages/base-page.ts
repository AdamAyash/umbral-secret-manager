import { Directive, inject, Input, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast/toast.service";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QueryParameters } from "./query-parameters";
import { LoadingAnimationService } from "../../services/loading-animation-service/loading-animation-service";

/**
 *  Base page  abstract class providing basic functionality for most pages.
 */
@Directive()
export abstract class BasePage implements OnInit {

    @Input({ required: true }) public pageTitle: string = '';
    @Input() public pageSubTitle: string = '';

    private readonly _loadingAnimationService: LoadingAnimationService = inject(LoadingAnimationService);
    private readonly _toastService: ToastService = inject(ToastService);
    private readonly _router: Router = inject(Router);

    protected readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);


    /**
     * Whether the page is loading (if we have running requests)
     * @returns 
     */
    public isPageLoading(): boolean {
        return this._loadingAnimationService.isLoadingAnimationActive();
    }

    public showInfo(title?: string, description?: string): void {
        this._toastService.showInfo(title, description);
    }

    public showSuccess(title?: string, description?: string): void {
        this._toastService.showSuccess(title, description);
    }

    public showError(title?: string, description?: string): void {
        this._toastService.showError(title, description);
    }

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
