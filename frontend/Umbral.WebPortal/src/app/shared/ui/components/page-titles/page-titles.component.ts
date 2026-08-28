import { Component, input, InputSignal } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'umbral-page-titles',
  imports: [BreadcrumbModule],
  templateUrl: './page-titles.component.html',
  styleUrl: './page-titles.component.css',
})
export class PageTitlesComponent {
  public pageReference: InputSignal<BasePage> = input.required();
}
