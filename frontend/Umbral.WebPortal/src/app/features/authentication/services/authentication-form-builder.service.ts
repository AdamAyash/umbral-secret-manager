import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationFormBuilderService {

    private readonly passwordMinLength: number = 8;

    public buildLoginForm(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(this.passwordMinLength),
            ])
        }
            , {
                updateOn: 'submit'
            });
    }

    public buildSignUpForm(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ])
        }
            , {
                updateOn: 'submit'
            });
    }
}