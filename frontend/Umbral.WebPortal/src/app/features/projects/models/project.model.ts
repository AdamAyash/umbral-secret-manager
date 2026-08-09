import { ProjectStatus } from "./projects-status";

export class ProjectModel {
    public id?: string;
    public name?: string;
    public description?: string;
    public status?: ProjectStatus;
    public environments?: number;
    public secrets?: number;
    public members?: number;
    public updatedAt?: string;
}