import { Component, inject } from '@angular/core';
import { BaseDialog } from '../../../../core/ui/dialogs/base-dialog/base-dialog';
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { NewProjectModel } from '../../models/create-new-project/new-project.model';
import { BaseDialogTemplateComponent } from "../../../../core/ui/dialogs/base-dialog-template/base-dialog-template.component";
import { Button } from "primeng/button";
import { ErrorMessageComponent } from "../../../../shared/ui/components";
import { ProjectsFormBuilderService } from '../../services/projects-form-builder-service/projects-form-builder.service';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
@Component({
  selector: 'umbral-create-new-project-dialog',
  imports: [BaseDialogTemplateComponent, Button, ErrorMessageComponent, TextareaModule, ReactiveFormsModule, InputText],
  templateUrl: './create-new-project.dialog.html',
  styleUrl: './create-new-project.dialog.css',
})
export class CreateNewProjectDialog extends BaseDialog<EmptyInputModel, NewProjectModel> {

  public createNewProjectForm!: FormGroup;
  private _projectsFormBuilderService: ProjectsFormBuilderService = inject(ProjectsFormBuilderService);

  public get projectName(): AbstractControl | null {
    return this.createNewProjectForm.get('projectName');
  }

  public get projectDescription(): AbstractControl | null {
    return this.createNewProjectForm.get('projectDescription');
  }

  protected override initialize(): void {
    this.createNewProjectForm = this._projectsFormBuilderService.buildCreateNewProjectForm();
  }

  protected override validateData(): boolean {
    this.createNewProjectForm.markAllAsTouched();
    return this.createNewProjectForm.valid;
  }

  protected override onCloseDialog(): void {
    super.onCloseDialog();
    this.createNewProjectForm.reset();
  }

  protected override onSubmit(): boolean {
    if (!super.onSubmit())
      return false;

    return true;
  }

}
