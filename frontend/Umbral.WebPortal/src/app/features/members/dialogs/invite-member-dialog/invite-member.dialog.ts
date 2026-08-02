import { Component, inject } from '@angular/core';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersFormBuilderService } from '../../services/members-form-builder.service';
import { ErrorMessageComponent } from "../../../../shared/ui/components";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { UserRoles } from '../../../../shared/enums/user-roles';
import { MembersService } from '../../services/members.service';
import { InviteMemberInputModel } from '../../models/invite-member/invite-member-input.model';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { MembersErrorCodes } from '../../services/members-error-codes';

interface Roles {
  label: string;
  value: UserRoles
}

@Component({
  selector: 'umbral-invite-member-dialog',
  imports: [
    BaseDialogTemplateComponent, Button, InputText, FormsModule, SelectModule, ReactiveFormsModule, ErrorMessageComponent, IconFieldModule, InputIconModule
  ],
  providers: [MembersFormBuilderService],
  templateUrl: './invite-member.dialog.html',
  styleUrl: './invite-member.dialog.css',
})
export class InviteMemberDialog extends BaseDialog<EmptyInputModel, EmptyOutputModel> {

  public userRoles: Roles[] = [
    { label: "Operator", value: UserRoles.Operator }
  ]

  public inviteMemberForm!: FormGroup;

  private readonly _membersFormBuilderService: MembersFormBuilderService = inject(MembersFormBuilderService);
  private readonly _memberService: MembersService = inject(MembersService);

  private _inviteMemberResponseProcessable: IServerResponseProcessable<EmptyOutputModel, MembersErrorCodes> = {

    processResult: (output: EmptyOutputModel): boolean => {
      this.transferData(output);
      this._toastService.showInfo('Member Invited', 'The invitation has been sent successfully. Pending members will appear in the members list until they accept the invitation.');

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<MembersErrorCodes>) => {
      //
    }
  };

  public get email(): AbstractControl | null {
    return this.inviteMemberForm.get('email');
  }

  public get memberRole(): AbstractControl | null {
    return this.inviteMemberForm.get('memberRole');
  }

  protected override initialize(): void {
    this.inviteMemberForm = this._membersFormBuilderService.buildInviteMemberForm();
  }

  protected override validateData(): boolean {
    this.inviteMemberForm.markAllAsTouched();
    return this.inviteMemberForm.valid;
  }

  protected override onCloseDialog(): void {
    super.onCloseDialog();
    this.inviteMemberForm.reset();
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    const inviteMemberInputModel = new InviteMemberInputModel();
    inviteMemberInputModel.email = this.email?.value;
    inviteMemberInputModel.role = this.memberRole?.value;

    this._memberService.inviteMember(inviteMemberInputModel, this._inviteMemberResponseProcessable);

    return true;
  }
}
