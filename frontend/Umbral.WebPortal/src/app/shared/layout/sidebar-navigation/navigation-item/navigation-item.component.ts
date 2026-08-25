import { Component, input, InputSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItemData } from '../../../../layout/layout.config';

@Component({
  selector: 'umbral-navigation-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-item.component.html',
  styleUrl: './navigation-item.component.css',
})
export class NavigationItemComponent {
  public readonly navigationItemData: InputSignal<NavigationItemData> = input.required<NavigationItemData>();
}
