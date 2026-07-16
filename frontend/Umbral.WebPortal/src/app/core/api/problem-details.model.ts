/**
 * A problem details model following the RFC error standard.
 */
export class ProblemDetailsModel<TServiceErrorCodes> {
    public type?: string;
    public title?: string;
    public status?: number;
    public detail?: string;
    public instance?: string;
    public errorCode?: TServiceErrorCodes;
    public traceId?: string;
}