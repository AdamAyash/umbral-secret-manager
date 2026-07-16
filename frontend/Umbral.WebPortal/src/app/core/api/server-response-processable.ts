import { ProblemDetailsModel } from ".";
export interface IServerResponseProcessable<TOutputModel, TServiceErrorCodes> {
    processResult: (output: TOutputModel) => boolean;
    processError: (problemDetails: ProblemDetailsModel<TServiceErrorCodes>) => void;
}