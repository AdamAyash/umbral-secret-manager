import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
@Component({
  selector: 'umbral-user-profile',
  imports: [ButtonModule, MenuModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  public readonly menuItems: MenuItem[] = [
    {
      label: 'Account',
      items: [
        {
          label: 'My profile',
          icon: 'pi pi-user',
        },
      ],
    },
  ];
}
