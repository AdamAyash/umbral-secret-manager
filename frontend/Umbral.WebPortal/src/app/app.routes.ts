import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'projects',
                loadComponent: () =>
                    import('./features/projects/projects.page')
                        .then(m => m.ProjectsPage)
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.page')
                        .then(m => m.DashboardPage)
            },
        ]
    }
];
