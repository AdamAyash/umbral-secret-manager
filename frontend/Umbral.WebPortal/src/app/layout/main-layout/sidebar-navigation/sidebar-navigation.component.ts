import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { LayoutService } from '../../../core/services/layout/layout.service';
import { NavigationItemData } from '../../layout.config';

@Component({
  selector: 'umbral-sidebar-navigation',
  imports: [ButtonModule, NavigationItemComponent],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.css',
})
export class SidebarNavigationComponent {
  private layoutService: LayoutService = inject(LayoutService);

  public getNavigationItems(): NavigationItemData[] {
    return this.layoutService.NavigationItems;
  }
}
