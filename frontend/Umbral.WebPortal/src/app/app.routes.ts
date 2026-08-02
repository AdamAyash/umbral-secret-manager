import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SignInPage } from './features/authentication/pages/sign-in/sign-in.page';
import { authenticationGuard } from './core/guards/authentication-guard';
import { SignUpPage } from './features/authentication/pages/sign-up/sign-up.page';
import { CheckEmailPage } from './features/authentication/pages/check-email/check-email.page';

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
        path: 'sign-in',
        component: SignInPage
    },
    {
        path: 'sign-up',
        component: SignUpPage
    },
    {
        path: 'check-email',
        component: CheckEmailPage
    },
];
