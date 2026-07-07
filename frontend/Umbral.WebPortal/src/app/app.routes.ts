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
                    import('./features/projects/projects.page')
                        .then(m => m.ProjectsPage)
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.page')
                        .then(m => m.DashboardPage)
            },
            {
                path: 'members',
                loadComponent: () =>
                    import('./features/members/members.page')
                        .then(m => m.MembersPage)
            },
        ]
    },
    {
        path: 'login',
        component: LoginPage
    }
];
