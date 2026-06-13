import { Component } from '@angular/core';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'umbral-main-layout',
  imports: [SidebarNavigationComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

}
