import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

// Authguard stops users from accessing routes which require authentication
const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home-screen/home-screen.module').then(m => m.HomeScreenPageModule)
    },
    {
        path: 'home-screen',
        loadChildren: () => import('./pages/home-screen/home-screen.module').then(m => m.HomeScreenPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'user-profile', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfilePageModule)
    },
    {
        path: 'user-requests', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/user-requests/user-requests.module').then(m => m.UserRequestsPageModule)
    },
    {
        path: 'log-seizure', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/log-seizure/log-seizure.module').then(m => m.LogSeizurePageModule)
    },
    {
        path: 'film-list', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/film-list/film-list.module').then(m => m.FilmListPageModule)
    },
    {
        path: 'create-request', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/create-request/create-request.module').then(m => m.CreateRequestPageModule)
    },
    {
        path: 'welcome', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'registration',
        loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
    },
    {
        path: '**',
        loadChildren: () => import('./pages/routing-error/routing-error.module').then(m => m.RoutingErrorPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
