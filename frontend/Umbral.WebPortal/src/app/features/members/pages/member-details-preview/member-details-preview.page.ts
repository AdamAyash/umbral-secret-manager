import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../../../../core/ui';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { BasePageTemplateComponent } from '../../../../core/ui/pages/base-page-template/base-page-template.component';
import { MemberModel } from '../../models/member.model';
import { MemberStatus } from '../../../../shared/enums/member-status';
import { MembersService } from '../../services/members.service';
import { GetAllMembersInputModel } from '../../models/get-all-members/get-all-members-input.model';
import { GetAllMembersOutputModel } from '../../models/get-all-members/get-all-members-output.model';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { MembersErrorCodes } from '../../services/members-error-codes';

@Component({
  selector: 'umbral-member-details-preview',
  imports: [BasePageTemplateComponent, PageTitlesComponent],
  templateUrl: './member-details-preview.page.html',
  styleUrl: './member-details-preview.page.css',
})
export class MemberDetailsPreviewPage extends BasePage {

  public member?: MemberModel;

  private readonly _route = inject(ActivatedRoute);
  private readonly _membersService = inject(MembersService);

  private readonly _getAllMembersResponseProcessable: IServerResponseProcessable<
    GetAllMembersOutputModel,
    MembersErrorCodes
  > = {
    processResult: (output: GetAllMembersOutputModel): boolean => {
      const memberId = this._route.snapshot.paramMap.get('id');
      this.member = output.members.find((member) => member.id === memberId);
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<MembersErrorCodes>): void => {
      // The base page handles displaying request errors.
    },
  };

  protected override initialize(): void {
    this.pageTitle = 'Member details'
    this.pageSubTitle = 'View this member\'s account and access information.'
  }
  protected override loadData(): void {
    this._membersService.getAllMembers(
      new GetAllMembersInputModel(),
      this._getAllMembersResponseProcessable,
    );
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

}
