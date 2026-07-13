import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, EMPTY } from "rxjs";
import { ProblemDetailsModel, IServerResponseProcessable, BaseServerResponse } from ".";

/**
 * A base server request service class
 */
@Injectable({
    providedIn: 'root'
})
export abstract class BaseServerRequestService {

    // Http client
    private _httpClient: HttpClient = inject(HttpClient);

    /**
     * domain of the current service
     */
    protected abstract getServiceDomain(): string;

    protected sendServerPostRequest<TInputModel, TOutputModel>(
        serviceRoute: string,
        inputModel: TInputModel,
        serviceProcessable: IServerResponseProcessable<TOutputModel>,
    ): void {
        this._httpClient
            .post<BaseServerResponse<TOutputModel>>(
                this.constructFullRequestURL(serviceRoute),
                inputModel
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    serviceProcessable.processError(error.error as ProblemDetailsModel);
                    return EMPTY;
                }))
            .subscribe((serverResponse) => {
                if (serverResponse.data && serverResponse.isSuccessful) {
                    if (!serviceProcessable.processResult(serverResponse.data)) {
                        //
                    }
                }
            });
    }

    /**
     * Constructs a full request url (server address + domain + serviceRoute)
     * @param serviceRoute route of the server endpoint
     * @returns a full constructed url
     */
    private constructFullRequestURL(serviceRoute: string): string {
        return environment.serverUrl + this.getServiceDomain() + '/' + serviceRoute;
    }
}