import { Component, inject, input, InputSignal } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '../../../../core/services/breadcrumb/breadcrumb.service';
@Component({
  selector: 'umbral-page-titles',
  imports: [BreadcrumbModule],
  templateUrl: './page-titles.component.html',
  styleUrl: './page-titles.component.css',
})
export class PageTitlesComponent {
  public pageReference: InputSignal<BasePage> = input.required();
  public breadCrumbsService: BreadcrumbService = inject(BreadcrumbService);
}
