import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BaseServerResponse, ProblemDetailsModel } from "./base-server-response";
import { IServerResponseProcessable } from "./server-response-processable";
import { catchError, EMPTY } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseServerRequestService {

    private _httpClient: HttpClient = inject(HttpClient);

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

    private constructFullRequestURL(serviceRoute: string): string {
        return environment.serverUrl + this.getServiceDomain() + '/' + serviceRoute;
    }
}