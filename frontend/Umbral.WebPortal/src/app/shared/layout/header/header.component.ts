import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'umbral-header',
  imports: [ButtonModule, InputTextModule, IconFieldModule, InputIconModule, UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  public readonly unreadNotificationCount = signal(3);
}
