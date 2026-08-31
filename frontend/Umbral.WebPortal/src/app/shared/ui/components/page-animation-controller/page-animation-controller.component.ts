import { Component, inject } from '@angular/core';
import { LoadingAnimationService } from '../../../../core/services/loading-animation-service/loading-animation-service';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'umbral-page-animation-controller',
  imports: [BlockUIModule, ProgressSpinnerModule],
  templateUrl: './page-animation-controller.component.html',
  styleUrl: './page-animation-controller.component.css',
})
export class PageAnimationControllerComponent {
  public readonly loadingAnimationService: LoadingAnimationService = inject(LoadingAnimationService);
}
