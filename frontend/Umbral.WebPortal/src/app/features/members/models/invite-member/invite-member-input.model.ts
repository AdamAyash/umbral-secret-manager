import { UserRoles } from "../../../../shared/enumerations/user-roles";

export class InviteMemberInputModel {
    public email?: string;
    public role?: UserRoles;
}