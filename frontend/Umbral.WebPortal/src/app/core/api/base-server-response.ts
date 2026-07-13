export class BaseServerResponse<OutputModel> {
    public dateTimeStamp?: Date;
    public isSuccessful?: boolean;
    public data?: OutputModel;
}