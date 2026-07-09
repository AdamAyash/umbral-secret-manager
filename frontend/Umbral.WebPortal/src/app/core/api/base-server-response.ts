export class BaseServerResponse<OutputModel> {
    public dateTimeStamp?: Date;
    public isSuccessful?: boolean;
    public data?: OutputModel;
}

export class ProblemDetailsModel {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    code?: string;
    traceId?: string;
}