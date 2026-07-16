import { inject, Injectable } from "@angular/core";
import { BaseServerRequestService } from "../../../core/api/base-server-request.service";
import { IServerResponseProcessable } from "../../../core/api/server-response-processable"
import { LoginInputModel } from "../models/login/login-input.model";
import { LoginOutputModel } from "../models/login/login-output.model";
import { UserSessionModel } from "../models/user-session.model";
import { LocalStorageService } from "../../../core/services/local-storage/local-storage.service";
import { Router } from "@angular/router";
import { UserAuthenticationErrorCodes } from "./user-authentication-error-codes";
import { SignUpInputModel } from "../models/sign-up/sign-up-input.model";
import { SignUpOutputModel } from "../models/sign-up/sign-up-output.model";

/**
 * User authentication service 
 */
@Injectable({ providedIn: 'root' })
export class UserAuthenticationService extends BaseServerRequestService {

    private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);
    private readonly _userSessionLocalStorageKey: string = "USER_SESSION";
    private readonly _router: Router = inject(Router);

    private _userSession?: UserSessionModel;

    /**
     * login request 
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public login(inputModel: LoginInputModel, serverResponseProcessable: IServerResponseProcessable<LoginOutputModel,
        UserAuthenticationErrorCodes>): void {
        this.sendServerPostRequest('login', inputModel, serverResponseProcessable)
    }

    /**
     * sign up request
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public signUp(inputModel: SignUpInputModel, serverResponseProcessable: IServerResponseProcessable<SignUpOutputModel,
        UserAuthenticationErrorCodes>): void {
        this.sendServerPostRequest('sign-up', inputModel, serverResponseProcessable)
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
        this._router.navigate(['/login']);
    }

    /**
     * Gets the current service domain
     * @returns 
     */
    protected override getServiceDomain(): string {
        return 'authentication'
    }
}