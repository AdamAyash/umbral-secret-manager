import { Injectable } from "@angular/core";
import { BaseServerRequestService, IServerResponseProcessable } from "../../../core/api";
import { InviteMemberInputModel } from "../models/invite-member/invite-member-input.model";
import { EmptyOutputModel } from "../../../core/api/models/empty-output.model";
import { MembersErrorCodes } from "./members-error-codes";
import { GetAllMembersOutputModel } from "../models/get-all-members/get-all-members-output.model";
import { GetMemberInputModel } from "../models/get-member/get-member-input.model";
import { GetMemberOutputModel } from "../models/get-member/get-member-output.model";

@Injectable({ providedIn: 'root' })
export class MembersService extends BaseServerRequestService {

    public inviteMember(inputModel: InviteMemberInputModel,
        serverResponseProcessable: IServerResponseProcessable<EmptyOutputModel, MembersErrorCodes>): void {
        this.sendServerPostRequest('invite-member', inputModel, serverResponseProcessable);
    }

    public getAllMembers(serverResponseProcessable: IServerResponseProcessable<GetAllMembersOutputModel, MembersErrorCodes>
    ): void {
        this.sendServerGetRequest('get-all-members', serverResponseProcessable);
    }

    public getMember(id: string, serverResponseProcessable: IServerResponseProcessable<GetMemberOutputModel, MembersErrorCodes>): void {
        const getMemberInputModel = new GetMemberInputModel();
        getMemberInputModel.id = id;

        this.sendServerPostRequest('get-member', getMemberInputModel, serverResponseProcessable);
    }

    protected override getServiceDomain(): string {
        return 'members';
    }
}