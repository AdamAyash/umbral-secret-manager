import { MemberStatus } from "../../../shared/enumerations/member-status";
import { UserRoles } from "../../../shared/enumerations/user-roles";

export class MemberModel {
    public id?: string;
    public name?: string;
    public initials?: string;
    public email?: string;
    public role?: UserRoles;
    public lastActiveAt?: Date;
    public status?: MemberStatus;
}