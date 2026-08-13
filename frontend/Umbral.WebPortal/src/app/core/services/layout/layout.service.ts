import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { MAIN_SIDEBAR_ITEMS, NavigationContext, NavigationItemData, PROJECT_SIDEBAR_ITEMS } from '../../../layout/layout.config';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly router: Router = inject(Router);
  private _navigationItems: WritableSignal<NavigationItemData[]> = signal([]);

  public get navigationItems(): NavigationItemData[] {
    return this._navigationItems();
  }

  public constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .subscribe(event => {
        const currentRoute = this.getDeepestRoute(this.router.routerState.root);

        const navigationContext = currentRoute.snapshot.data['navigationContext'];

        if (navigationContext) {
          this._navigationItems.set(this.navigationItemsFactory(navigationContext));
        }
        else
          this._navigationItems.set(MAIN_SIDEBAR_ITEMS);
      });
  }

  private navigationItemsFactory(navigationContext: NavigationContext): NavigationItemData[] {
    switch (navigationContext) {
      case NavigationContext.Projects:
        return PROJECT_SIDEBAR_ITEMS;
      default:
        return MAIN_SIDEBAR_ITEMS;
    }
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}
