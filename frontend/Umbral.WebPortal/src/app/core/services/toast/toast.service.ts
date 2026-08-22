import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Severity } from "../../../shared/enumerations/severity";

/**
 * Toast message service for displaying messages
 */
@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private _messageService: MessageService = inject(MessageService);

    /**
     * 
     * @param title 
     * @param details 
     * @param isSticky 
     */
    public showInfo(title?: string, details?: string, isSticky: boolean = false): void {
        this._messageService.add({ severity: Severity.Info, summary: title, detail: details, sticky: isSticky });
    }

    /**
     * 
     * @param title 
     * @param details 
     * @param isSticky 
     */
    public showSuccess(title?: string, details?: string, isSticky: boolean = false): void {
        this._messageService.add({ severity: Severity.Success, summary: title, detail: details, sticky: isSticky });
    }

    /**
     * 
     * @param title 
     * @param details 
     * @param isSticky 
     */
    public showError(title?: string, details?: string, isSticky: boolean = false): void {
        this._messageService.add({ severity: Severity.Error, summary: title, detail: details, sticky: isSticky });
    }
}