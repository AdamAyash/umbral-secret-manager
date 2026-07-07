export interface IServerResponseProcessable<TOutputModel> {
    processResult: (output: TOutputModel) => boolean;
    processError: () => void;
}