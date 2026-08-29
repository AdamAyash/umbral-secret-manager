import { Component } from '@angular/core';
import { BasePage, BasePageTemplateComponent } from "../../../../core/ui";
import { PageTitlesComponent } from "../../../../shared/ui/components/page-titles/page-titles.component";
import { InputText } from "primeng/inputtext";
import { Textarea } from "primeng/textarea";
import { Button } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'umbral-project-details',
  imports: [BasePageTemplateComponent, PageTitlesComponent, InputText, Textarea, Button, CheckboxModule],
  templateUrl: './project-details.page.html',
  styleUrl: './project-details.page.css',
})
export class ProjectDetailsPage extends BasePage {

  protected override initialize(): void {
    this.pageTitle = 'Project Overview';
    this.pageSubTitle = 'Manage your project\'s name  delete protection.'
  }
  protected override loadData(): boolean {
    return true;
  }
  protected override validate(): boolean {
    return true;
  }

}
