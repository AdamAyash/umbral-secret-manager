import { UserRoles } from "../../../shared/models/user-roles";

/**
 * A User session model with basic information.
 */
export class UserSessionModel {
    public id?: string;
    public userName?: string;
    public email?: string;
    public role?: UserRoles;
    public fullName?: string;
}