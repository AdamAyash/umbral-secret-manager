import { ApplicationIcons } from "../shared/ui/icons/application-icons";

export interface NavigationItemData {
  label: string;
  icon: string;
  route: string;
}

export const MAIN_SIDEBAR_ITEMS: NavigationItemData[] = [
  { label: 'Dashboard', icon: ApplicationIcons.Dashboard, route: '/dashboard' },
  { label: 'Projects', icon: ApplicationIcons.Projects, route: '/projects' },
  { label: 'Members', icon: ApplicationIcons.Members, route: '/members' }
];
