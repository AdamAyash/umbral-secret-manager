import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
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
