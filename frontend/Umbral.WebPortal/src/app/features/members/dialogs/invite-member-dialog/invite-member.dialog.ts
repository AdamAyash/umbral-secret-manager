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
import { UserRoles } from '../../../authentication/models/user-roles';

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

    this.onCloseDialog()
    return true;
  }
}
