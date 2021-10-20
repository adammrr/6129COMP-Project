import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home-screen/home-screen.module').then(m => m.HomeScreenPageModule)
    },
    {
        path: 'user-profile',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfilePageModule)
    },
    {
        path: 'user-requests',
        loadChildren: () => import('./pages/user-requests/user-requests.module').then(m => m.UserRequestsPageModule)
    },
    {
        path: 'log-seizure',
        loadChildren: () => import('./pages/log-seizure/log-seizure.module').then(m => m.LogSeizurePageModule)
    },
    {
        path: 'film-list',
        loadChildren: () => import('./pages/film-list/film-list.module').then(m => m.FilmListPageModule)
    }


];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
