import { ProblemDetailsModel } from "./base-server-response";

export interface IServerResponseProcessable<TOutputModel> {
    processResult: (output: TOutputModel) => boolean;
    processError: (problemDetails: ProblemDetailsModel) => void;
}