import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginPage } from './features/authentication/pages/login/login.page';
import { authenticationGuard } from './core/guards/authentication-guard';
import { SignUpPage } from './features/authentication/pages/sign-up/sign-up.page';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authenticationGuard],
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
    },
    {
        path: 'sign-up',
        component: SignUpPage
    },
    {
        path: 'check-email',
        loadComponent: () =>
            import('./features/authentication/pages/check-email/check-email.page')
                .then(m => m.CheckEmailPage)
    },
];
