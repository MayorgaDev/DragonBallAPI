import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./pages/new-account/new-account.component').then((m) => m.NewAccountComponent),
    },
    {
        path: 'index',
        loadComponent: () =>
            import('./pages/index/index.component').then((m) => m.IndexComponent),
        canActivate: [authGuard],
    },
    {
        path: 'detail/:id',
        loadComponent: () =>
            import('./pages/details/details.component').then((m) => m.DetailsComponent),
        canActivate: [authGuard],
    },
    {
        path: 'favorites',
        loadComponent: () =>
            import('./pages/favorites/favorites.component').then((m) => m.FavoritesComponent),
        canActivate: [authGuard],
    },
    {
        path: 'not-found',
        loadComponent: () =>
            import('./pages/not-found/not-found.component').then(
                (m) => m.NotFoundComponent,
            ),
    },
    {
        path: '**',
        redirectTo: '/not-found',
    },
];
