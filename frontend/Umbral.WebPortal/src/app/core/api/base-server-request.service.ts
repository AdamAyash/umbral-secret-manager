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
    private readonly _httpClient: HttpClient = inject(HttpClient);

    /**
     * Domain of the current service
     */
    protected abstract getServiceDomain(): string;

    protected sendServerPostRequest<TInputModel, TOutputModel, TServiceErrorCodes>(
        serviceRoute: string,
        inputModel: TInputModel,
        serviceProcessable: IServerResponseProcessable<TOutputModel, TServiceErrorCodes>,
    ): void {
        this._httpClient
            .post<BaseServerResponse<TOutputModel>>(
                this.constructFullRequestURL(serviceRoute),
                inputModel
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const problemDetails: ProblemDetailsModel<TServiceErrorCodes> = error.error as ProblemDetailsModel<TServiceErrorCodes>;
                    if (problemDetails)
                        serviceProcessable.processError(problemDetails);
                    else
                        console.log("Error happened");

                    return EMPTY;
                }))
            .subscribe((serverResponse) => {
                if (serverResponse.data && serverResponse.isSuccessful) {
                    if (!serviceProcessable.processResult(serverResponse.data)) {
                        //TODO
                    }
                }
            });
    }

    protected sendServerGetRequest<TOutputModel, TServiceErrorCodes>(
        serviceRoute: string,
        serviceProcessable: IServerResponseProcessable<TOutputModel, TServiceErrorCodes>,
    ): void {
        this._httpClient
            .get<BaseServerResponse<TOutputModel>>(
                this.constructFullRequestURL(serviceRoute)
            )
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const problemDetails: ProblemDetailsModel<TServiceErrorCodes> = error.error as ProblemDetailsModel<TServiceErrorCodes>;
                    if (problemDetails)
                        serviceProcessable.processError(problemDetails);
                    else
                        console.log("Error happened");

                    return EMPTY;
                }))
            .subscribe((serverResponse) => {
                if (serverResponse.data && serverResponse.isSuccessful) {
                    if (!serviceProcessable.processResult(serverResponse.data)) {
                        //TODO
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