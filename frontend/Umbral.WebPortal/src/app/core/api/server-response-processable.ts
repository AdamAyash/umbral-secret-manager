import { ProblemDetailsModel } from ".";
export interface IServerResponseProcessable<TOutputModel> {
    processResult: (output: TOutputModel) => boolean;
    processError: (problemDetails: ProblemDetailsModel) => void;
}