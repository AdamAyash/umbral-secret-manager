import { Directive, Input, OnInit } from "@angular/core";

/**
 * 
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
}
