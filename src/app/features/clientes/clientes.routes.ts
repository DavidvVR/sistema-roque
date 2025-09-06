import { Routes } from '@angular/router';

export const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./clientes-list.component').then(m => m.ClientesListComponent),
  },
  {
    path: ':id', // 'nuevo' o un ID
    loadComponent: () =>
      import('./clientes-form.component').then(m => m.ClientesFormComponent),
  }
];
