import { FormControl, FormGroup, Validators } from "@angular/forms";

export class MembersFormBuilderService {

    public buildInviteMemberForm(): FormGroup {
        return new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            memberRole: new FormControl('', [
                Validators.required,
            ])
        }
            , {
                updateOn: 'submit'
            });
    }
}