import { inject, Injectable } from "@angular/core";
import { BaseServerRequestService } from "../../../core/api/base-server-request.service";
import { IServerResponseProcessable } from "../../../core/api/server-response-processable"
import { SingInInputModel } from "../models/sign-in/sign-in-input.model";
import { UserSessionModel } from "../models/user-session.model";
import { LocalStorageService } from "../../../core/services/local-storage/local-storage.service";
import { Router } from "@angular/router";
import { UserAuthenticationErrorCodes } from "./user-authentication-error-codes";
import { SignUpInputModel } from "../models/sign-up/sign-up-input.model";
import { SignUpOutputModel } from "../models/sign-up/sign-up-output.model";
import { ResendEmailVerificationInputModel } from "../models/resend-email-verification/resend-email-verification-input.model";
import { ResendEmailVerificationOutputModel } from "../models/resend-email-verification/resend-email-verification-output.model";
import { SignInOutputModel } from "../models/sign-in/sign-in-output.model";
import { UserRoles } from "../../../shared/enumerations/user-roles";

/**
 * User authentication service 
 */
@Injectable({ providedIn: 'root' })
export class UserAuthenticationService extends BaseServerRequestService {

    private readonly _localStorageService: LocalStorageService = inject(LocalStorageService);
    private readonly _userSessionLocalStorageKey: string = "UserSession";
    private readonly _router: Router = inject(Router);

    private _userSession?: UserSessionModel;

    /**
     * Sign in request 
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public singIn(inputModel: SingInInputModel, serverResponseProcessable: IServerResponseProcessable<SignUpOutputModel,
        UserAuthenticationErrorCodes>): void {
        this.sendServerPostRequest('sign-in', inputModel, serverResponseProcessable)
    }

    /**
     * sign up request
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public signUp(inputModel: SignUpInputModel, serverResponseProcessable: IServerResponseProcessable<SignInOutputModel,
        UserAuthenticationErrorCodes>): void {
        this.sendServerPostRequest('sign-up', inputModel, serverResponseProcessable)
    }

    /**
     * resend email verification
     * @param inputModel 
     * @param serverResponseProcessable 
     */
    public resendEmailVerification(inputModel: ResendEmailVerificationInputModel, serverResponseProcessable: IServerResponseProcessable<ResendEmailVerificationOutputModel,
        UserAuthenticationErrorCodes>): void {
        this.sendServerPostRequest('resend-email-verification', inputModel, serverResponseProcessable)
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
     * Checks if the currently logged user has a specifier role.
     * @param role 
     * @returns 
     */
    public hasUserRole(role?: UserRoles): boolean {

        if (!this.isUserAuthenticated())
            return false;

        return this.getUserSession()?.role === role;
    }

    /**
     * Logs out the current user.
     */
    public logout(): void {
        this._localStorageService.removeItem(this._userSessionLocalStorageKey);
        this._router.navigate(['/sign-in']);
    }

    /**
     * Gets the current service domain
     * @returns 
     */
    protected override getServiceDomain(): string {
        return 'authentication'
    }
}