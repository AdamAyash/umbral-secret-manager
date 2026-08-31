import { Component } from '@angular/core';
import { BasePage } from '../../../../core/ui';
import { PageHeaderComponent } from '../../../../shared/ui/components/page-header/page-header.component';

@Component({
  selector: 'umbral-dashboard',
  imports: [PageHeaderComponent],
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
