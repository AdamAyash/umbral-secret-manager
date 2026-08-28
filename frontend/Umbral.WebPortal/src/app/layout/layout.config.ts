import { ApplicationIcons } from "../shared/ui/icons/application-icons";

export enum NavigationContext {
  Main = 'main',
  Projects = 'projects'
}

export interface NavigationItemData {
  label: string;
  icon: string;
  route: string;
}

export const MAIN_SIDEBAR_ITEMS: NavigationItemData[] = [
  { label: 'Dashboard', icon: ApplicationIcons.Dashboard, route: '/dashboard' },
  { label: 'Projects', icon: ApplicationIcons.Folder, route: '/projects' },
  { label: 'Organization Members', icon: ApplicationIcons.Users, route: '/members' },
  { label: 'Notifications', icon: ApplicationIcons.Bell, route: '/notifications' }
];

export const PROJECT_SIDEBAR_ITEMS: NavigationItemData[] = [
  { label: 'Overview', icon: ApplicationIcons.Dashboard, route: 'overview' },
  { label: 'Secrets vault', icon: ApplicationIcons.Lock, route: 'secrets-vault' },
];
