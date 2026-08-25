import { Component, inject, input, InputSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { OrganizationWidgetComponent } from "./organization-widget/organization-widget.component";
import { NavigationContext, NavigationItemData } from '../../../layout/layout.config';

@Component({
  selector: 'umbral-sidebar-navigation',
  imports: [ButtonModule, NavigationItemComponent, OrganizationWidgetComponent],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.css',
})
export class SidebarNavigationComponent {
  public navigationContext: InputSignal<NavigationContext> = input.required();
  private layoutService: LayoutService = inject(LayoutService);

  public getNavigationItems(): NavigationItemData[] {
    return this.layoutService.getNavigationItems(this.navigationContext());
  }
}
