import { Component, inject } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { BasePageTemplateComponent } from '../../../../core/ui/pages/base-page-template/base-page-template.component';
import { MemberModel } from '../../models/member.model';
import { MembersService } from '../../services/members.service';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { MembersErrorCodes } from '../../services/members-error-codes';
import { GetMemberOutputModel } from '../../models/get-member/get-member-output.model';
import { QueryParameters } from '../../../../core/ui/pages/query-parameters';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { MemberStatus } from '../../../../shared/enumerations/member-status';

interface MemberProject {
  id: string;
  name: string;
  role: string;
  environments: number;
  secrets: number;
  addedAt: string;
}

@Component({
  selector: 'umbral-member-details-preview',
  imports: [BasePageTemplateComponent, PageTitlesComponent, MenuModule, TableModule],
  templateUrl: './member-details-preview.page.html',
  styleUrl: './member-details-preview.page.css',
})
export class MemberDetailsPreviewPage extends BasePage {

  public member?: MemberModel;
  public readonly projects: MemberProject[] = [];
  public readonly memberActions: MenuItem[] = [
    {
      label: 'Deactivate member',
      icon: 'pi pi-user-minus',
      command: () => this.toastService.showInfo('Deactivate member', 'Member deactivation will be available soon.'),
    },
    {
      label: 'Delete member',
      icon: 'pi pi-trash text-red-400',
      command: () => this.toastService.showInfo('Delete member', 'Member deletion will be available soon.'),
    },
  ];

  private readonly _membersService: MembersService = inject(MembersService);
  private _getMemberResponseProcessable: IServerResponseProcessable<GetMemberOutputModel, MembersErrorCodes> = {

    processResult: (output: GetMemberOutputModel): boolean => {
      this.member = output.member;
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<MembersErrorCodes>) => {
      //
    }

  };

  public override getBreadCrumps(): MenuItem[] {
    return [
      { label: 'Dashboard', routerLink: '/dashboard' },
    ]
  }

  protected override initialize(): void {
    this.pageTitle = 'Member details'
    this.pageSubTitle = 'View this member\'s account and access information.'
  }
  protected override loadData(): boolean {

    const memberId: string | null = this.getQueryParameter(QueryParameters.Id)
    if (!memberId)
      return false;

    this._membersService.getMember(memberId, this._getMemberResponseProcessable);

    return true;
  }
  protected override validate(): boolean {
    return true;
  }

  public getMemberStatusClass(status?: MemberStatus): string {
    switch (status) {
      case MemberStatus.Active:
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      case MemberStatus.PendingInvite:
        return 'border-[#A78BFA33] bg-[#8B5CF6]/10 text-[#C4B5FD]';
      case MemberStatus.Inactive:
        return 'border-[#F43F5E33] bg-[#F43F5E]/10 text-[#FB7185]';
      default:
        return 'border-[#A78BFA1F] bg-[#121A2F] text-[#94A3B8]';
    }
  }

  public async copyToClipboard(value: string | undefined, label: string): Promise<void> {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      this.toastService.showInfo('Copied', `${label} copied to clipboard.`);
    } catch {
      this.toastService.showError('Copy failed', `Unable to copy the ${label.toLowerCase()}.`);
    }
  }

  public onAddToProject(): void {
    this.toastService.showInfo('Add to project', 'Project assignment will be available soon.');
  }

}
