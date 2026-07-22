import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasePage } from '../../../../core/ui/pages/base-page';
import { BasePageTemplateComponent } from "../../../../core/ui/pages/base-page-template/base-page-template.component";
import { EmptyInputModel } from '../../../../core/api/models/empty-input.model';
import { EmptyOutputModel } from '../../../../core/api/models/empty-output.model';
import { BaseDialogController } from '../../../../core/ui/dialogs/base-dialog-controller/base-dialog-controller';
import { InviteMemberDialog } from '../../dialogs/invite-member-dialog/invite-member.dialog';
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
  imports: [TableModule, BasePageTemplateComponent, InviteMemberDialog],
  templateUrl: './members-preview.page.html',
  styleUrl: './members-preview.page.css',
})
export class MembersPreviewPage extends BasePage {

  public dialogController: BaseDialogController<EmptyInputModel, EmptyOutputModel> = new BaseDialogController<EmptyInputModel, EmptyOutputModel>();

  protected override initialize(): void {
    this.pageTitle = 'Members'
    this.pageSubTitle = 'Manage everyone who belongs to your organization.'
  }
  protected override validate(): boolean {
    return true;
  }
  public members: Member[] = [
    {
      id: 'mem_001',
      name: 'Adam Ayash',
      email: 'adam@shadowbyte.dev',
      initials: 'AA',
      role: 'Owner',
      projectCount: 4,
      status: 'Active',
      lastActive: 'Today',
    },
    {
      id: 'mem_002',
      name: 'Sarah Dev',
      email: 'sarah@shadowbyte.dev',
      initials: 'SD',
      role: 'Admin',
      projectCount: 2,
      status: 'Active',
      lastActive: '2 hours ago',
    },
    {
      id: 'mem_003',
      name: 'Mike Viewer',
      email: 'mike@shadowbyte.dev',
      initials: 'MV',
      role: 'Member',
      projectCount: 1,
      status: 'Invited',
      lastActive: '—',
    },
  ];

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
    const outputModel = new EmptyOutputModel();

    this.dialogController.openDialog(inputModel, outputModel);
  }
}
