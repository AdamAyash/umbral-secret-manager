import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ToastModule } from 'primeng/toast';
import { LoadingAnimationService } from './core/services/loading-animation-service/loading-animation-service';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'umbral-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ToastModule, BlockUIModule, ProgressSpinnerModule],
})
export class AppComponent {
  public readonly loadingAnimationService: LoadingAnimationService = inject(LoadingAnimationService);
} 
