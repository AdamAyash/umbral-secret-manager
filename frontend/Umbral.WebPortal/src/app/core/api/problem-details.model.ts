/**
 * A problem details model following the RFC error standard.
 */
export class ProblemDetailsModel {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
    code?: string;
    traceId?: string;
}