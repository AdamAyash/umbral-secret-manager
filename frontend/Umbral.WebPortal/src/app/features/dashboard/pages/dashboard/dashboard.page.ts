import { Component } from '@angular/core';
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { BasePage } from '../../../../core/ui';

@Component({
  selector: 'umbral-dashboard',
  imports: [PageTitlesComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage extends BasePage {

  protected override initialize(): void {
    this.pageTitle = 'Dashboard'
    this.pageSubTitle = 'Get your secure workspace ready for your team.'
  }

  protected override loadData(): boolean {
    return true;
  }

  protected override validate(): boolean {
    return true;
  }

}
