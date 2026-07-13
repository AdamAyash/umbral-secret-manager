import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

/**
 * 
 */
@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private _messageService = inject(MessageService);

    public showError(title?: string, details?: string, isSticky: boolean = false): void {
        this._messageService.add({ severity: 'error', summary: title, detail: details, sticky: isSticky });
    }
}