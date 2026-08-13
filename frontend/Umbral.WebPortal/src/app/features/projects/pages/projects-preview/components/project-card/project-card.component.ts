import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ProjectModel } from '../../../../models/project.model';
import { ProjectStatus } from '../../../../models/projects-status';

@Component({
  selector: 'umbral-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  public project: InputSignal<ProjectModel> = input.required();
  public projectCardClicked: OutputEmitterRef<void> = output();

  public getStatusClass(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.Active:
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      default: return '';
    }
  }

  protected onProjectCardClicked(): void {
    this.projectCardClicked.emit();
  }
}
