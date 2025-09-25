import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component')
            .then(c => c.HomeComponent)
    },
    {
        path: 'agenda',
        loadComponent: () => import('./features/agenda/agenda.component')
            .then(c => c.AgendaComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/contact/contact.component')
            .then(c => c.ContactComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component')
            .then(c => c.AdminComponent),
        loadChildren: () => import('./admin/admin-routes')
            .then(r => r.adminRoutes)
    },
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component')
            .then(c => c.LoginComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./features/home/home.component')
            .then(c => c.HomeComponent)
    }
];
