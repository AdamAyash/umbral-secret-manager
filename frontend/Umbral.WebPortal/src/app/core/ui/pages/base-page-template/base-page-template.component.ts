import { Component, input, InputSignal, } from '@angular/core';
import { BasePage } from '../base-page';

@Component({
  selector: 'umbral-base-page-template',
  imports: [],
  templateUrl: './base-page-template.component.html',
  styleUrl: './base-page-template.component.css',
})
export class BasePageTemplateComponent {
  public pageReference: InputSignal<BasePage> = input.required();
}
