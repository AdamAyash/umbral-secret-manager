import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ToastModule } from 'primeng/toast';
import { PageAnimationControllerComponent } from "./shared/ui/components/page-animation-controller/page-animation-controller.component";
@Component({
  selector: 'umbral-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, ToastModule, PageAnimationControllerComponent],
})
export class AppComponent {
} 
