import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { SidebarNavigationComponent } from '../shared/layout/sidebar-navigation/sidebar-navigation.component';
import { HeaderComponent } from '../shared/layout/header/header.component';
import { NavigationContext } from '../layout/layout.config';

@Component({
  selector: 'umbral-project-layout',
  imports: [SidebarNavigationComponent, HeaderComponent, RouterOutlet],
  templateUrl: './project-layout.component.html',
  styleUrl: './project-layout.component.css',
})
export class ProjectLayoutComponent {
  protected navigationContext: NavigationContext = NavigationContext.Projects;
}
