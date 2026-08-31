import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { TableModule, TableRowSelectEvent } from 'primeng/table';
import { BasePage } from '../../../../core/ui/pages/base-page';
import { BasePageTemplateComponent } from "../../../../core/ui/pages/base-page-template/base-page-template.component";
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { BaseDialogMediator } from '../../../../core/ui/dialogs/base-dialog-mediator/base-dialog-mediator';
import { InviteMemberDialog } from '../../dialogs/invite-member-dialog/invite-member.dialog';
import { MembersService } from '../../services/members.service';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { MembersErrorCodes } from '../../services/members-error-codes';
import { GetAllMembersOutputModel } from '../../models/get-all-members/get-all-members-output.model';
import { MemberModel } from '../../models/member.model';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MemberStatus } from '../../../../shared/enumerations/member-status';
import { TableActionButtonComponent } from "../../../../shared/ui/components/tables/table-action-button/table-action-button.component";
import { SearchBarComponent } from "../../../../shared/ui/components/search-bar/search-bar.component";
import { PageHeaderComponent } from '../../../../shared/ui/components/page-header/page-header.component';
import { PageActionButtonComponent } from '../../../../shared/ui/components';

@Component({
  selector: 'umbral-members-preview-page',
  imports: [TableModule, BasePageTemplateComponent, InviteMemberDialog, PageHeaderComponent, ConfirmDialogModule, PageActionButtonComponent, TableActionButtonComponent, SearchBarComponent],
  templateUrl: './members-preview.page.html',
  styleUrl: './members-preview.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class MembersPreviewPage extends BasePage {

  public membersDialogMediator: BaseDialogMediator<EmptyInputModel, MemberModel> = new BaseDialogMediator<EmptyInputModel, MemberModel>();
  public members: WritableSignal<MemberModel[]> = signal(new Array<MemberModel>);
  public currentlySelectedMember?: MemberModel;

  private filteredMembers: MemberModel[] = [];

  private readonly _membersService: MembersService = inject(MembersService)
  private readonly _confirmationService: ConfirmationService = inject(ConfirmationService);

  private _getAllMembersResponseProcessable: IServerResponseProcessable<GetAllMembersOutputModel, MembersErrorCodes> = {

    processResult: (output: GetAllMembersOutputModel): boolean => {
      this.members.set(output.members);
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processError: (problemDetails: ProblemDetailsModel<MembersErrorCodes>) => {
      //
    }
  };

  protected override initialize(): void {

    this.pageTitle = 'Members'
    this.pageSubTitle = 'Manage everyone who belongs to your organization.'
  }

  protected override loadData(): boolean {
    this._membersService.getAllMembers(this._getAllMembersResponseProcessable)

    return true;
  }

  protected override validate(): boolean {
    return true;
  }

  protected getMemberStatusClass(status: MemberStatus): string {
    switch (status) {
      case MemberStatus.Active:
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      case MemberStatus.PendingInvite:
        return 'border-[#A78BFA33] bg-[#8B5CF6]/10 text-[#C4B5FD]';
      case MemberStatus.Inactive:
        return 'border-[#F43F5E33] bg-[#F43F5E]/10 text-[#FB7185]';
    }
  }

  protected onInviteMember(): void {

    const inputModel = new EmptyInputModel();

    this.membersDialogMediator.openDialog(inputModel).subscribe((member) => {
      if (member)
        this.members().push(member);
    })
  }

  protected onMemberSelected(event: TableRowSelectEvent<MemberModel>): void {

    const memberModel = event.data as MemberModel;
    if (memberModel) {
      this.redirectTo(`members/details/${memberModel.id}`);
    }
  }

  protected getMembers(): MemberModel[] {
    if (this.filteredMembers.length > 0)
      return this.filteredMembers;

    return this.members();
  }

  protected onSearchMembers(searchValue: string): void {
    this.filteredMembers = this.members().filter(member => member.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      || member.email?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }

  protected onDeleteMember(member: MemberModel): void {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete this member?',
      header: 'Danger Zone',
      position: 'center',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },

      accept: () => {
        this.members.update(members => members.filter(currentMember => currentMember.id != member?.id))
      },
      reject: () => {
        return;
      }
    });
  }
}
