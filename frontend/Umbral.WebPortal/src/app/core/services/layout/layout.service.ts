import { Injectable, signal, WritableSignal } from '@angular/core';
import { MAIN_SIDEBAR_ITEMS, NavigationContext, NavigationItemData, PROJECT_SIDEBAR_ITEMS } from '../../../layout/layout.config';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  private _navigationItems: WritableSignal<NavigationItemData[]> = signal([]);

  public getNavigationItems(navigationContext: NavigationContext): NavigationItemData[] {
    return this.navigationItemsFactory(navigationContext);
  }

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
