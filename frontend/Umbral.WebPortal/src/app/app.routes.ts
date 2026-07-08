import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginPage } from './features/authentication/pages/login/login.page';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'projects',
                loadComponent: () =>
                    import('./features/projects/pages/projects-preview/projects-preview.page')
                        .then(m => m.ProjectsPreviewPage)
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/pages/dashboard/dashboard.page')
                        .then(m => m.DashboardPage)
            },
            {
                path: 'members',
                loadComponent: () =>
                    import('./features/members/pages/members-preview/members-preview.page')
                        .then(m => m.MembersPreviewPage)
            },
        ]
    },
    {
        path: 'login',
        component: LoginPage
    }
];
