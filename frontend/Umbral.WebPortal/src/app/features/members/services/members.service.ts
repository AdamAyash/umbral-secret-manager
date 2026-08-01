import { Injectable } from "@angular/core";
import { BaseServerRequestService, IServerResponseProcessable } from "../../../core/api";
import { InviteMemberInputModel } from "../models/invite-member/invite-member-input.model";
import { EmptyOutputModel } from "../../../core/api/models/empty-output.model";
import { MembersErrorCodes } from "./members-error-codes";
import { GetAllMembersInputModel } from "../models/get-all-members/get-all-members-input.model";
import { GetAllMembersOutputModel } from "../models/get-all-members/get-all-members-output.model";

@Injectable({ providedIn: 'root' })
export class MembersService extends BaseServerRequestService {

    public inviteMember(inputModel: InviteMemberInputModel,
        serverResponseProcessable: IServerResponseProcessable<EmptyOutputModel, MembersErrorCodes>): void {
        this.sendServerPostRequest('invite-member', inputModel, serverResponseProcessable);
    }

    public getAllMembers(inputModel: GetAllMembersInputModel,
        serverResponseProcessable: IServerResponseProcessable<GetAllMembersOutputModel, MembersErrorCodes>
    ): void {
        this.sendServerPostRequest('get-all-members', inputModel, serverResponseProcessable);
    }

    protected override getServiceDomain(): string {
        return 'members';
    }
}