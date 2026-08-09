import { Injectable } from "@angular/core";
import { BaseServerRequestService, IServerResponseProcessable } from "../../../core/api";
import { GetAllProjectsOutputModel } from "../models/get-all-projects/get-all-projects-output.model";
import { ProjectsServiceErrorCodes } from "./projects-service-error-codes";

@Injectable({ providedIn: 'root' })
export class ProjectsService extends BaseServerRequestService {

    public getAllProjects(serverResponseProcessable: IServerResponseProcessable<GetAllProjectsOutputModel, ProjectsServiceErrorCodes>): void {
        this.sendServerGetRequest('get-all-projects', serverResponseProcessable);
    }

    protected override getServiceDomain(): string {
        return 'projects';
    }

}