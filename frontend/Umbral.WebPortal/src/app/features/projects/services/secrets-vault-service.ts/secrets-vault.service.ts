import { Injectable } from "@angular/core";
import { BaseServerRequestService, IServerResponseProcessable } from "../../../../core/api";
import { SecretsVaultServiceErrorCodes } from "./secrets-vault-service-error-codes";
import { GetSecretsByProjectIdOutputModel } from "../../models/get-secrets-by-project-id/get-secrets-by-project-id-output.model";
import { GetSecretsByProjectIdInputModel } from "../../models/get-secrets-by-project-id/get-secrets-by-project-id-input.model";

/**
 * Secrets vault data service.
 */
@Injectable({ providedIn: 'root' })
export class SecretsVaultService extends BaseServerRequestService {

    public getSecretsByProjectId(projectId: string, serverResponseProcessable: IServerResponseProcessable<GetSecretsByProjectIdOutputModel, SecretsVaultServiceErrorCodes>): void {
        const inputModel = new GetSecretsByProjectIdInputModel();
        inputModel.projectId = projectId;

        this.sendServerPostRequest('get-secrets-by-project-id', inputModel, serverResponseProcessable)
    }

    protected override getServiceDomain(): string {
        return 'secrets-vault'
    }

}