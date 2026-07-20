import { Component } from '@angular/core';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'umbral-invite-member-dialog',
  imports: [BaseDialogTemplateComponent, Button, InputText, FormsModule],
  templateUrl: './invite-member.dialog.html',
  styleUrl: './invite-member.dialog.css',
})
export class InviteMemberDialogComponent extends BaseDialog<EmptyInputModel, EmptyOutputModel> {

  protected override validateData(): boolean {
    return true;
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    this.baseDialogController().closeDialog();
    return true;
  }
}
