import { Injectable } from '@angular/core';
import { MAIN_SIDEBAR_ITEMS, NavigationItemData } from '../../../layout/layout.config';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private navigationItems: NavigationItemData[] = [];

  public get NavigationItems(): NavigationItemData[] {
    return this.navigationItems
  }

  public constructor() {
    this.navigationItems = MAIN_SIDEBAR_ITEMS
  }
}
