import { Component, input, InputSignal, } from '@angular/core';
import { BasePage } from '../base-page';
import { PageAnimationControllerComponent } from "../../../../shared/ui/components/page-animation-controller/page-animation-controller.component";

@Component({
  selector: 'umbral-base-page-template',
  imports: [PageAnimationControllerComponent],
  templateUrl: './base-page-template.component.html',
  styleUrl: './base-page-template.component.css',
})
export class BasePageTemplateComponent {
  public pageReference: InputSignal<BasePage> = input.required();
  public isPageAnimationControllerActive: InputSignal<boolean> = input(false);
}
