import { inject, Injectable } from "@angular/core";
import { BaseServerRequestService } from "../../../core/api/base-server-request.service";
import { IServerResponseProcessable } from "../../../core/api/server-response-processable"
import { LoginInputModel } from "../models/login/login-input.model";
import { LoginOutputModel } from "../models/login/login-output.model";
import { UserModel } from "../models/user/user.model";
import { LocalStorageService } from "../../../core/services/local-storage/local-storage.service";

/**
 * User authentication service 
 */
@Injectable({ providedIn: 'root' })
export class UserAuthenticationService extends BaseServerRequestService {

    private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);
    private readonly _UserDataLocalStorageKey = "USER_DATA";

    public login(inputModel: LoginInputModel, serverResponseProcessable: IServerResponseProcessable<LoginOutputModel>): void {
        this.sendServerPostRequest('login', inputModel, serverResponseProcessable)
    }

    public saveUser(user: UserModel): void {

    }

    protected override getServiceDomain(): string {
        return 'authentication'
    }
}