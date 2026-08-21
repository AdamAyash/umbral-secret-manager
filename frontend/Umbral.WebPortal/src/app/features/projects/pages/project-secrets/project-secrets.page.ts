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

@Component({
  selector: 'umbral-project-secrets',
  imports: [BasePageTemplateComponent, PageTitlesComponent, TableModule, InputTextModule, FormsModule, PasswordModule, SelectModule, ActionButtonComponent],
  templateUrl: './project-secrets.page.html',
  styleUrl: './project-secrets.page.css',
})
export class ProjectSecretsPage extends BasePage {

  private _tempSecrets: SecretModel[] = [
    {
      name: 'Database connection',
      value: 'adadadaji1ejoijdio',
      environment: 'development',
    },
    {
      name: 'Stripe API key',
      value: 'sk_live_ji1ejoijdio',
      environment: 'staging',
    },
    {
      name: 'JWT signing key',
      value: 'a7Jf9K2mQ1xV8rT4',
      environment: 'production',
    },
  ];

  public secrets: WritableSignal<SecretModel[]> = signal(this._tempSecrets);
  public readonly environmentOptions = [
    { label: 'Development', value: 'development' },
    { label: 'Staging', value: 'staging' },
    { label: 'Production', value: 'production' },
  ];
  private readonly revealedSecrets = new Set<SecretModel>();

  public isSecretRevealed(secret: SecretModel): boolean {
    return this.revealedSecrets.has(secret);
  }

  public toggleSecretVisibility(secret: SecretModel): void {
    if (this.revealedSecrets.has(secret)) {
      this.revealedSecrets.delete(secret);
      return;
    }

    this.revealedSecrets.add(secret);
  }

  protected override initialize(): void {
    this.pageTitle = 'Project Overview';
    this.pageSubTitle = 'Manage project secrets'
  }
  protected override loadData(): void {
    //
  }
  protected override validate(): boolean {
    return true;
  }

}
