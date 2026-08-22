import { Component, signal, WritableSignal } from '@angular/core';
import { BasePage, BasePageTemplateComponent } from '../../../../core/ui';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { TableModule } from 'primeng/table';
import { SecretModel } from '../../models/secret.model';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ActionButtonComponent } from "../../../../shared/ui/components/action-button/action-button.component";
import { TableActionButtonComponent } from "../../../../shared/ui/components/tables/table-action-button/table-action-button.component";
import { Environments } from '../../../../shared/enumerations/environments';
import { SearchBarComponent } from "../../../../shared/ui/components/search-bar/search-bar.component";

@Component({
  selector: 'umbral-project-secrets',
  imports: [BasePageTemplateComponent, PageTitlesComponent, TableModule, InputTextModule, FormsModule, PasswordModule, SelectModule, ActionButtonComponent, TableActionButtonComponent, SearchBarComponent],
  templateUrl: './project-secrets.page.html',
  styleUrl: './project-secrets.page.css',
})
export class ProjectSecretsPage extends BasePage {

  private _tempSecrets: SecretModel[] = [
    {
      id: "1",
      name: 'Database connection',
      value: 'adadadaji1ejoijdio',
      environment: Environments.Development,
    },
    {
      id: "2",
      name: 'Stripe API key',
      value: 'sk_live_ji1ejoijdio',
      environment: Environments.Staging,
    },
    {
      id: "3",
      name: 'JWT signing key',
      value: 'a7Jf9K2mQ1xV8rT4',
      environment: Environments.Production,
    },
  ];

  private filteredSecrets: SecretModel[] = [];

  public secrets: WritableSignal<SecretModel[]> = signal(this._tempSecrets);

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

  protected override initialize(): void {
    this.pageTitle = 'Project Overview';
    this.pageSubTitle = 'Manage and protect your project secrets'
  }
  protected override loadData(): void {
    //
  }
  protected override validate(): boolean {
    return true;
  }

}
