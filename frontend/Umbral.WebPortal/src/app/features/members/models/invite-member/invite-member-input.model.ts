import { UserRoles } from "../../../../shared/enums/user-roles";

export class InviteMemberInputModel {
    public email?: string;
    public role?: UserRoles;
}