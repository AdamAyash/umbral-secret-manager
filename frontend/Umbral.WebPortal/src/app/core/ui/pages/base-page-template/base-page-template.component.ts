import { Component, Input } from '@angular/core';
import { BasePage } from '../base-page';

@Component({
  selector: 'umbral-base-page-template',
  imports: [],
  templateUrl: './base-page-template.component.html',
  styleUrl: './base-page-template.component.css',
})
export class BasePageTemplateComponent {
  @Input({ required: true }) public pageReference: BasePage | undefined;
}
