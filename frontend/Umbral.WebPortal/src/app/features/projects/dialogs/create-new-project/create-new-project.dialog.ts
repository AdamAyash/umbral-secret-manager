import { Component } from '@angular/core';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { NewProjectModel } from '../../models/create-new-project/new-project.model';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";

@Component({
  selector: 'umbral-create-new-project-dialog',
  imports: [BaseDialogTemplateComponent],
  templateUrl: './create-new-project.dialog.html',
  styleUrl: './create-new-project.dialog.css',
})
export class CreateNewProjectDialog extends BaseDialog<EmptyInputModel, NewProjectModel> {

  protected override initialize(): void {
    //
  }

}
