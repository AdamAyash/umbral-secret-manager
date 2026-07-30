import { Injectable } from "@angular/core";
import { BaseServerRequestService, IServerResponseProcessable } from "../../../core/api";
import { InviteMemberInputModel } from "../models/invite-member/invite-member-input.model";
import { EmptyOutputModel } from "../../../core/api/models/empty-output.model";
import { MembersErrorCodes } from "./members-error-codes";

@Injectable({ providedIn: 'root' })
export class MembersService extends BaseServerRequestService {

    public inviteMember(inputModel: InviteMemberInputModel,
        serverResponseProcessable: IServerResponseProcessable<EmptyOutputModel, MembersErrorCodes>): void {
        this.sendServerPostRequest('invite-member', inputModel, serverResponseProcessable);
    }

    protected override getServiceDomain(): string {
        return 'members';
    }
}