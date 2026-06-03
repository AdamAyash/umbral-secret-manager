import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'umbral-main-layout',
  imports: [AvatarModule, BadgeModule, MenuModule, InputTextModule, RippleModule, ButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayout {
  public items: MenuItem[] | undefined;

  public constructor() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Refresh',
            icon: 'pi pi-refresh'
          },
          {
            label: 'Export',
            icon: 'pi pi-upload'
          }
        ]
      }
    ];
  }


}
