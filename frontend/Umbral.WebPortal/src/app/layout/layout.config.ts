import { UserRoles } from "../shared/enumerations/user-roles";
import { ApplicationIcons } from "../shared/ui/icons/application-icons";

export enum NavigationContext {
  Main = 'main',
  Projects = 'projects'
}

export interface NavigationItemData {
  label: string;
  icon: string;
  route: string;
  roles?: UserRoles[];
}

const ALL_USER_ROLES: UserRoles[] = [UserRoles.Operator, UserRoles.Member, UserRoles.Viewer];

export const MAIN_SIDEBAR_ITEMS: NavigationItemData[] = [
  { label: 'Dashboard', icon: ApplicationIcons.Dashboard, route: '/dashboard', roles: ALL_USER_ROLES },
  { label: 'Projects', icon: ApplicationIcons.Folder, route: '/projects', roles: ALL_USER_ROLES },
  { label: 'Organization Members', icon: ApplicationIcons.Users, route: '/members', roles: [UserRoles.Operator] },
  { label: 'Notifications', icon: ApplicationIcons.Bell, route: '/notifications', roles: ALL_USER_ROLES }
];

export const PROJECT_SIDEBAR_ITEMS: NavigationItemData[] = [
  { label: 'Overview', icon: ApplicationIcons.Dashboard, route: 'details', roles: ALL_USER_ROLES },
  { label: 'Secrets vault', icon: ApplicationIcons.Lock, route: 'secrets', roles: ALL_USER_ROLES },
];
