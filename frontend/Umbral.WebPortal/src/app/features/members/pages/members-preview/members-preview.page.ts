import { ChangeDetectionStrategy, Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
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
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MemberStatus } from '../../../../shared/enums/member-status';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'umbral-members-preview-page',
  imports: [TableModule, BasePageTemplateComponent, InviteMemberDialog, ContextMenuModule, PageTitlesComponent, ConfirmDialogModule],
  templateUrl: './members-preview.page.html',
  styleUrl: './members-preview.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
})
export class MembersPreviewPage extends BasePage {

  public membersDialogMediator: BaseDialogMediator<EmptyInputModel, MemberModel> = new BaseDialogMediator<EmptyInputModel, MemberModel>();
  public members: WritableSignal<MemberModel[]> = signal(new Array<MemberModel>);
  public membersContextMenuItems?: MenuItem[];
  public currentlySelectedMember?: MemberModel;

  private readonly _membersService: MembersService = inject(MembersService)
  private readonly _confirmationService: ConfirmationService = inject(ConfirmationService);

  private memberActionsContextMenu: Signal<ContextMenu | undefined> = viewChild<ContextMenu>('memberActionsContextMenu');

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

    this.membersContextMenuItems = [
      {
        label: 'Deactivate member',
        icon: 'pi pi-user-minus',
      },
      {
        label: 'Delete member',
        icon: 'pi pi-trash text-red-400',
        command: () => this.deleteMember()
      },
    ];
  }

  protected override loadData(): void {
    this._membersService.getAllMembers(this._getAllMembersResponseProcessable)
  }

  protected override validate(): boolean {
    return true;
  }

  public getMemberStatusClass(status: MemberStatus): string {
    switch (status) {
      case MemberStatus.Active:
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      case MemberStatus.PendingInvite:
        return 'border-[#A78BFA33] bg-[#8B5CF6]/10 text-[#C4B5FD]';
      case MemberStatus.Inactive:
        return 'border-[#F43F5E33] bg-[#F43F5E]/10 text-[#FB7185]';
    }
  }

  public onInviteMemberDialog(): void {

    const inputModel = new EmptyInputModel();

    this.membersDialogMediator.openDialog(inputModel).subscribe((member) => {
      if (member)
        this.members().push(member);
    })
  }

  public onMemberActions(event: MouseEvent, member?: MemberModel): void {
    this.memberActionsContextMenu()?.show(event);
    this.currentlySelectedMember = member;
  }

  public onMemberSelected(event: TableRowSelectEvent<MemberModel>): void {

    const memberModel = event.data as MemberModel;
    if (memberModel) {
      this.redirectTo(`members/details/${memberModel.id}`);
    }
  }

  public deleteMember(): void {
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
        const memberIndex = this.members().findIndex(member => member.id == this.currentlySelectedMember?.id);
        // if (memberIndex < 0)
        //   //TODO ERROR
        this.members.update(members => members.splice(memberIndex, 1))
      },
      reject: () => {
        return;
      }
    });
  }
}
