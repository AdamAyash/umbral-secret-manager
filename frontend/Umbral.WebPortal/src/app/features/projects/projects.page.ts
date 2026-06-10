import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'umbral-projects',
  imports: [TableModule],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.css',
})
export class ProjectsPage { }

