import { Injectable } from "@angular/core";
import { BaseServerRequestService } from "../../../core/api/base-server-request.service";
import { IServerResponseProcessable } from "../../../core/api/server-response-processable"
import { LoginInputModel } from "../models/login/login-input.model";
import { LoginOutputModel } from "../models/login/login-output.model";

/**
 * User authentication service 
 */
@Injectable({ providedIn: 'root' })
export class UserAuthenticationService extends BaseServerRequestService {

    public login(inputModel: LoginInputModel, serverResponseProcessable: IServerResponseProcessable<LoginOutputModel>): void {
        this.sendServerPostRequest('login', inputModel, serverResponseProcessable)
    }

    protected override getServiceDomain(): string {
        return 'authentication'
    }
}