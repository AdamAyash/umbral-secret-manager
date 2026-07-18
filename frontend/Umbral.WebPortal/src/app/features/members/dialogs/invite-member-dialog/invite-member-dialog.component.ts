import { Component } from '@angular/core';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';

@Component({
  selector: 'umbral-invite-member-dialog',
  imports: [BaseDialogTemplateComponent],
  templateUrl: './invite-member-dialog.component.html',
  styleUrl: './invite-member-dialog.component.css',
})
export class InviteMemberDialogComponent extends BaseDialog<EmptyInputModel, EmptyOutputModel> {
}
