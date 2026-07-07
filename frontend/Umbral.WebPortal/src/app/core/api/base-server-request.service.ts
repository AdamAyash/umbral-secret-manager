import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { BaseServerResponse } from "./base-server-response";
import { IServerResponseProcessable } from "./server-response-processable";

@Injectable({
    providedIn: 'root'
})
export abstract class BaseServerRequestService {

    private _httpClient: HttpClient = inject(HttpClient);
    protected abstract getServiceDomain(): string;

    protected sendServerRequest<TInputModel, TOutputModel>(
        serviceRoute: string,
        inputModel: TInputModel,
        serviceProcessable: IServerResponseProcessable<TOutputModel>,
    ): void {
        this._httpClient
            .post<BaseServerResponse<TOutputModel>>(
                this.constructFullRequestURL(serviceRoute),
                inputModel
            )
            .subscribe((serverResponse) => {
                if (serverResponse.output && serverResponse.isSuccessful) {
                    if (!serviceProcessable.processResult(serverResponse.output)) {
                        //
                    }
                }
            });
    }

    private constructFullRequestURL(serviceRoute: string): string {
        return environment.serverUrl + this.getServiceDomain() + '/' + serviceRoute;
    }
}