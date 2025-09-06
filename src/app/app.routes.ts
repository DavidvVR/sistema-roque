import { Routes } from '@angular/router';
import { canActivateAuth } from './core/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: '',
    loadComponent: () => import('./layout/shell.component').then(m => m.ShellComponent),
    children: [
      {
        path: 'dashboard',
        canActivate: [canActivateAuth],
        loadComponent: () => import('./features/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
      },
      {
        path: 'clientes',
        canActivate: [canActivateAuth],
        loadChildren: () => import('./features/clientes/clientes.routes')
          .then(m => m.CLIENTES_ROUTES),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  },

  { path: '**', redirectTo: 'login' }
];
