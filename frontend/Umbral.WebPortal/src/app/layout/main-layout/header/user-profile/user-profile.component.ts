import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { UserAuthenticationService, UserSessionModel } from '../../../../features/authentication';
@Component({
  selector: 'umbral-user-profile',
  imports: [ButtonModule, MenuModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {

  private readonly _userAuthenticationService: UserAuthenticationService = inject(UserAuthenticationService);
  private _userSession?: UserSessionModel;

  public get userSession(): UserSessionModel | undefined {
    return this._userSession;
  }

  public ngOnInit(): void {
    this._userSession = this._userAuthenticationService.getUserSession();
  }

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
