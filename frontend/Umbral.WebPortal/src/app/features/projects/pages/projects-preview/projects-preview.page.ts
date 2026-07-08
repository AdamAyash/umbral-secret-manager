import { Component } from '@angular/core';

type ProjectStatus = 'Active' | 'Setup' | 'Archived';
interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  environments: number;
  secrets: number;
  members: number;
  updatedAt: string;
  icon: string;
}

@Component({
  selector: 'umbral-projects-preview-page',
  imports: [],
  templateUrl: './projects-preview.page.html',
  styleUrl: './projects-preview.page.css',
})
export class ProjectsPreviewPage {
  public readonly projects: readonly Project[] = [
    {
      id: 'warpath-devolved',
      name: 'Warpath Devolved',
      description: 'RTS backend, deployment, and environment secrets.',
      status: 'Active',
      environments: 3,
      secrets: 24,
      members: 5,
      updatedAt: '2 hours ago',
      icon: 'pi pi-box',
    },
    {
      id: 'umbral-web-portal',
      name: 'Umbral Web Portal',
      description: 'Frontend application configuration and service credentials.',
      status: 'Active',
      environments: 3,
      secrets: 18,
      members: 4,
      updatedAt: 'Yesterday',
      icon: 'pi pi-globe',
    },
    {
      id: 'deployment-pipeline',
      name: 'Deployment Pipeline',
      description: 'CI/CD tokens, signing keys, and infrastructure credentials.',
      status: 'Setup',
      environments: 2,
      secrets: 9,
      members: 3,
      updatedAt: '3 days ago',
      icon: 'pi pi-sitemap',
    },
    {
      id: 'legacy-billing',
      name: 'Legacy Billing',
      description: 'Retained credentials for the archived billing service.',
      status: 'Archived',
      environments: 1,
      secrets: 7,
      members: 2,
      updatedAt: 'May 24',
      icon: 'pi pi-wallet',
    },
  ];


  public getStatusClass(status: ProjectStatus): string {
    switch (status) {
      case 'Active':
        return 'border-[#11FCFA33] bg-[#11FCFA]/10 text-[#11FCFA]';
      case 'Setup':
        return 'border-[#FBBF2433] bg-[#FBBF24]/10 text-[#FCD34D]';
      case 'Archived':
        return 'border-[#64748B4D] bg-[#64748B]/10 text-[#94A3B8]';
    }
  }
}
