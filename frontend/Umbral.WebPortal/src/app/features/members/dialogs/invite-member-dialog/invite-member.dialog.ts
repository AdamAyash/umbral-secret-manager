import { Component } from '@angular/core';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { InputText } from "primeng/inputtext";

@Component({
  selector: 'umbral-invite-member-dialog',
  imports: [BaseDialogTemplateComponent, InputText],
  templateUrl: './invite-member.dialog.html',
  styleUrl: './invite-member.dialog.css',
})
export class InviteMemberDialogComponent extends BaseDialog<EmptyInputModel, EmptyOutputModel> {
}
