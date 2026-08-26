import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarNavigationComponent } from '../../shared/layout/sidebar-navigation/sidebar-navigation.component';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { NavigationContext } from '../layout.config';

@Component({
  selector: 'umbral-main-layout',
  imports: [SidebarNavigationComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  protected navigationContext: NavigationContext = NavigationContext.Main;
}
