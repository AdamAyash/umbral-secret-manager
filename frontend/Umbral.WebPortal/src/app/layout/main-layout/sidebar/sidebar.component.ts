import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'umbral-sidebar',
  imports: [RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

}
