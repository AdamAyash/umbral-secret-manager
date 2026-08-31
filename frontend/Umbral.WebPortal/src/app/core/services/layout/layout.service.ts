import { inject, Injectable } from '@angular/core';
import { MAIN_SIDEBAR_ITEMS, NavigationContext, NavigationItemData, PROJECT_SIDEBAR_ITEMS } from '../../../layout/layout.config';
import { UserAuthenticationService } from '../../../features/authentication';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private _authenticationService: UserAuthenticationService = inject(UserAuthenticationService);

  /**
   * 
   * @param navigationContext 
   * @returns 
   */
  public getNavigationItems(navigationContext: NavigationContext): NavigationItemData[] {

    const navigationItems: NavigationItemData[] = this.navigationItemsFactory(navigationContext);
    return this.filterNavigationItemsBasedOnUserRole(navigationItems);
  }

  private filterNavigationItemsBasedOnUserRole(navigationItems: NavigationItemData[]): NavigationItemData[] {

    const navigationItemsFiltered: NavigationItemData[] = [];

    for (let index = 0; index < navigationItems.length; ++index) {
      const navigationItem: NavigationItemData | undefined = navigationItems.at(index);
      if (!navigationItem)
        continue;

      navigationItem.roles?.forEach(role => {
        if (this._authenticationService.hasUserRole(role)) {
          navigationItemsFiltered.push(navigationItem);
          return;
        }
      });
    }

    return navigationItemsFiltered;
  }

  /**
   * 
   * @param navigationContext 
   * @returns 
   */
  private navigationItemsFactory(navigationContext: NavigationContext): NavigationItemData[] {
    switch (navigationContext) {
      case NavigationContext.Main:
        return MAIN_SIDEBAR_ITEMS;
      case NavigationContext.Projects:
        return PROJECT_SIDEBAR_ITEMS;
      default:
        return MAIN_SIDEBAR_ITEMS;
    }
  }
}
