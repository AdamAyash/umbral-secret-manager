import { Component, inject } from '@angular/core';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { NewProjectModel } from '../../models/create-new-project/new-project.model';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { Button } from "primeng/button";
import { ErrorMessageComponent } from "../../../../shared/ui/components";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { ProjectsFormBuilderService } from '../../services/projects-form-builder-service/projects-form-builder.service';

@Component({
  selector: 'umbral-create-new-project-dialog',
  imports: [BaseDialogTemplateComponent, Button, ErrorMessageComponent, InputIcon, IconField],
  templateUrl: './create-new-project.dialog.html',
  styleUrl: './create-new-project.dialog.css',
})
export class CreateNewProjectDialog extends BaseDialog<EmptyInputModel, NewProjectModel> {

  private _projectsFormBuilderService: ProjectsFormBuilderService = inject(ProjectsFormBuilderService);

  protected override initialize(): void {
    //
  }

}
