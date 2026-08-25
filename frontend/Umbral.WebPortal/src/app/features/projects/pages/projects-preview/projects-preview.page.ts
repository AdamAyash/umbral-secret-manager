import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { BasePage } from '../../../../core/ui';
import { ProjectsService } from '../../services/projects-service/project.service';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { GetAllProjectsOutputModel } from '../../models/get-all-projects/get-all-projects-output.model';
import { ProjectsServiceErrorCodes } from '../../services/projects-service/projects-service-error-codes';
import { ProjectModel } from '../../models/project.model';
import { ProjectCardComponent } from "./components/project-card/project-card.component";
import { ActionButtonComponent } from "../../../../shared/ui/components/action-button/action-button.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'umbral-projects-preview-page',
  imports: [PageTitlesComponent, ProjectCardComponent, ActionButtonComponent, RouterOutlet],
  templateUrl: './projects-preview.page.html',
  styleUrl: './projects-preview.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPreviewPage extends BasePage {

  public projects: WritableSignal<ProjectModel[]> = signal([]);

  private _projectsService: ProjectsService = inject(ProjectsService);

  private _getAllProjectServerResponseProcessable: IServerResponseProcessable<GetAllProjectsOutputModel, ProjectsServiceErrorCodes> = {
    processResult: (output: GetAllProjectsOutputModel): boolean => {
      if (!output.projects)
        return false;

      this.projects.set(output.projects);

      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<ProjectsServiceErrorCodes>) => {
      //
    }
  };

  protected override initialize(): void {
    this.pageTitle = 'Projects'
    this.pageSubTitle = 'Create and manage vaults for your applications, services, and environments.'
  }

  protected override loadData(): boolean {
    this._projectsService.getAllProjects(this._getAllProjectServerResponseProcessable);

    return true;
  }
  protected override validate(): boolean {
    return true;
  }

  public onProjectCardClicked(project: ProjectModel): void {
    this.redirectTo(`projects/project/${project.id}`);
  }
}
