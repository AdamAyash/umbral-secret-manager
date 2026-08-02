import { Component, inject, viewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasePage } from '../../../../core/ui/pages/base-page';
import { BasePageTemplateComponent } from "../../../../core/ui/pages/base-page-template/base-page-template.component";
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { BaseDialogMediator } from '../../../../core/ui/dialogs/base-dialog-mediator/base-dialog-mediator';
import { InviteMemberDialog } from '../../dialogs/invite-member-dialog/invite-member.dialog';
import { MembersService } from '../../services/members.service';
import { GetAllMembersInputModel } from '../../models/get-all-members/get-all-members-input.model';
import { IServerResponseProcessable, ProblemDetailsModel } from '../../../../core/api';
import { MembersErrorCodes } from '../../services/members-error-codes';
import { GetAllMembersOutputModel } from '../../models/get-all-members/get-all-members-output.model';
import { MemberModel } from '../../models/member.model';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'Owner' | 'Admin' | 'Member';
  projectCount: number;
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

@Component({
  selector: 'umbral-members-preview-page',
  imports: [TableModule, BasePageTemplateComponent, InviteMemberDialog, ContextMenuModule],
  templateUrl: './members-preview.page.html',
  styleUrl: './members-preview.page.css',
})
export class MembersPreviewPage extends BasePage {

  public membersDialogMediator: BaseDialogMediator<EmptyInputModel, EmptyOutputModel> = new BaseDialogMediator<EmptyInputModel, EmptyOutputModel>();
  public membersArray: MemberModel[] = new Array<MemberModel>;
  public membersContextMenuItems?: MenuItem[];

  private _membersService: MembersService = inject(MembersService)
  private memberActionsContextMenu = viewChild<ContextMenu>('memberActionsContextMenu');;

  private _getAllMembersResponseProcessable: IServerResponseProcessable<GetAllMembersOutputModel, MembersErrorCodes> = {

    processResult: (output: GetAllMembersOutputModel): boolean => {
      this.membersArray = output.members;
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
        label: 'Roles',
        icon: 'pi pi-users',
      }
    ];
  }

  protected override loadData(): void {
    this._membersService.getAllMembers(new GetAllMembersInputModel(), this._getAllMembersResponseProcessable)
  }

  protected override loadData(): void {
    //
  }

  protected override validate(): boolean {
    return true;
  }

  public getStatusClass(status: Member['status']): string {
    switch (status) {
      case 'Active':
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      case 'Invited':
        return 'border-[#A78BFA33] bg-[#8B5CF6]/10 text-[#C4B5FD]';
      case 'Suspended':
        return 'border-[#F43F5E33] bg-[#F43F5E]/10 text-[#FB7185]';
    }
  }

  public onInviteMemberDialog(): void {

    const inputModel = new EmptyInputModel();

    this.membersDialogMediator.openDialog(inputModel).subscribe(() => {
      // Reload the member list here. This runs for both a successful invite and a dismissed dialog.
    })
  }

  public onMemberActions(event: MouseEvent): void {
    this.memberActionsContextMenu()?.show(event);
  }
}
