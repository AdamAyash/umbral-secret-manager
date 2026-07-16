import { inject, Injectable } from "@angular/core";
import { BaseServerRequestService } from "../../../core/api/base-server-request.service";
import { IServerResponseProcessable } from "../../../core/api/server-response-processable"
import { LoginInputModel } from "../models/login/login-input.model";
import { LoginOutputModel } from "../models/login/login-output.model";
import { UserSessionModel } from "../models/user-session.model";
import { LocalStorageService } from "../../../core/services/local-storage/local-storage.service";

/**
 * User authentication service 
 */
@Injectable({ providedIn: 'root' })
export class UserAuthenticationService extends BaseServerRequestService {

    private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);
    private readonly _userSessionLocalStorageKey: string = "USER_SESSION";

    private _userSession?: UserSessionModel;

    /**
     * login request 
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public login(inputModel: LoginInputModel, serverResponseProcessable: IServerResponseProcessable<LoginOutputModel>): void {
        this.sendServerPostRequest('login', inputModel, serverResponseProcessable)
    }

    /**
     * Whether the user is authenticated.
     * @returns boolean
     */
    public isUserAuthenticated(): boolean {
        return this.getUserSession() != undefined;
    }

    /**
     * Saves the user data model in local storage
     * @param user user data model
     */
    public saveUserSession(userSession: UserSessionModel): void {
        this._localStorageService.setItem(this._userSessionLocalStorageKey, userSession);
        this._userSession = userSession;
    }

    /**
     * Gets the current user session.
     * @returns 
     */
    public getUserSession(): UserSessionModel | undefined {

        if (!this._userSession)
            this._userSession = this._localStorageService.getItem(this._userSessionLocalStorageKey) as UserSessionModel;

        return this._userSession;
    }

    /**
     * Logs out the current user.
     */
    public logout(): void {
        this._localStorageService.removeItem(this._userSessionLocalStorageKey);
    }

    /**
     * Gets the current service domain
     * @returns 
     */
    protected override getServiceDomain(): string {
        return 'authentication'
    }
}