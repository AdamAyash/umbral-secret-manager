import { Component, Input } from '@angular/core';
import { BasePage } from '../../../../core/ui';

@Component({
  selector: 'umbral-page-titles',
  imports: [],
  templateUrl: './page-titles.component.html',
  styleUrl: './page-titles.component.css',
})
export class PageTitlesComponent {
  @Input({ required: true }) public pageReference!: BasePage;
}
