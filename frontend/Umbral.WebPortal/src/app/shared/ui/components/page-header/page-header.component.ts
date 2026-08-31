import { Component, input, InputSignal } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
@Component({
  selector: 'umbral-page-header',
  imports: [BreadcrumbModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  public pageReference: InputSignal<BasePage> = input.required();
}
