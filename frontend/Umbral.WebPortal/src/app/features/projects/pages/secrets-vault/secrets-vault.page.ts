import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { BasePage, BasePageTemplateComponent, QueryParameters } from '../../../../core/ui';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { TableModule } from 'primeng/table';
import { SecretModel } from '../../models/secret.model';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ActionButtonComponent } from "../../../../shared/ui/components/action-button/action-button.component";
import { TableActionButtonComponent } from "../../../../shared/ui/components/tables/table-action-button/table-action-button.component";
import { Environments } from '../../../../shared/enumerations/environments';
import { SearchBarComponent } from "../../../../shared/ui/components/search-bar/search-bar.component";
import { Utilities } from '../../../../core/utilities/utilities';
import { SecretsVaultService } from '../../services/secrets-vault-service.ts/secrets-vault.service';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { GetSecretsByProjectIdOutputModel } from '../../models/get-secrets-by-project-id/get-secrets-by-project-id-output.model';
import { SecretsVaultServiceErrorCodes } from '../../services/secrets-vault-service.ts/secrets-vault-service-error-codes';

export interface SecretTableModel extends SecretModel {
  isRevealed: boolean;
}

@Component({
  selector: 'umbral-secrets-vault-page',
  imports: [BasePageTemplateComponent, PageTitlesComponent, TableModule, InputTextModule, FormsModule, SelectModule, ActionButtonComponent, TableActionButtonComponent, SearchBarComponent],
  templateUrl: './secrets-vault.page.html',
  styleUrl: './secrets-vault.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSecretsPage extends BasePage {

  private _secretsVaultService: SecretsVaultService = inject(SecretsVaultService);

  private filteredSecrets: SecretTableModel[] = [];
  private secretsSnapshot: Map<string, SecretTableModel> = new Map<string, SecretTableModel>();

  public readonly secretValueMask: string = '••••••••••••••••';
  public secrets: WritableSignal<SecretTableModel[]> = signal([]);

  private _getSecretsByProjectIdServerResponseProcessable: IServerResponseProcessable<GetSecretsByProjectIdOutputModel, SecretsVaultServiceErrorCodes> = {
    processResult: (output: GetSecretsByProjectIdOutputModel): boolean => {

      if (!this.secrets)
        return false;

      this.secrets.set(output.secrets as SecretTableModel[]);
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<SecretsVaultServiceErrorCodes>) => {
      //
    }
  };

  public readonly environmentOptions = [
    { label: 'Development', value: 'development' },
    { label: 'Staging', value: 'staging' },
    { label: 'Production', value: 'production' },
  ];

  public getEnvironmentBadge(environment: Environments): string {
    switch (environment) {
      case Environments.Development:
        return 'border-[##052E16] bg-[#4ADE80]/10 text-[#4ADE80]';
      case Environments.Staging:
        return 'border-[##451A03] bg-[#FBBF24]/10 text-[#FBBF24]';
      case Environments.Production:
        return 'border-[#450A0A] bg-[#F87171]/10 text-[#F87171]';
    }
  }

  protected onSearchSecrets(searchValue: string): void {
    this.filteredSecrets = this.secrets().filter(s => s.name?.toLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

  protected getSecrets(): SecretModel[] {
    if (this.filteredSecrets.length > 0)
      return this.filteredSecrets;

    return this.secrets();
  }

  protected revealSecretValue(secret: SecretTableModel): void {
    secret.isRevealed = true;
  }

  protected hideSecretValue(secret: SecretTableModel): void {
    secret.isRevealed = false;
  }

  protected onInitEditSecret(secret: SecretTableModel): void {
    if (!secret.id)
      return;

    const secretSnapshot = Utilities.cloneObject(secret);
    if (!secretSnapshot)
      return;

    this.secretsSnapshot.set(secret.id, secretSnapshot);
    this.revealSecretValue(secret);
  }

  protected onSaveSecret(secret: SecretTableModel): void {
    if (!secret.id)
      return;
    this.secretsSnapshot.delete(secret.id);
    this.hideSecretValue(secret);
    this.toastService.showSuccess('Success', 'Successfully saved secret.');
  }

  protected onCancelEditSecret(secret: SecretTableModel): void {
    if (!secret.id)
      return;

    const secretSnapshot = this.secretsSnapshot.get(secret.id);
    if (!secretSnapshot)
      return;

    this.secrets.update(secrets =>
      secrets.map(s =>
        s.id === secret.id
          ? secretSnapshot
          : s
      )
    );

    this.secretsSnapshot.delete(secret.id);
  }

  protected override initialize(): void {
    this.pageTitle = 'Project Overview';
    this.pageSubTitle = 'Manage and protect your project secrets'
  }

  protected override loadData(): boolean {
    const projectId = this._activatedRoute.snapshot.parent?.paramMap.get(QueryParameters.Id);

    if (!projectId)
      return false;

    this._secretsVaultService.getSecretsByProjectId(projectId, this._getSecretsByProjectIdServerResponseProcessable);

    return true;
  }

  protected override validate(): boolean {
    return true;
  }

}
