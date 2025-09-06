import { Routes } from '@angular/router';
export const SHIPMENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./shipments-list.component').then(m => m.ShipmentsListComponent) },
  { path: 'new', loadComponent: () => import('./shipments-form.component').then(m => m.ShipmentsFormComponent) },
  { path: ':id', loadComponent: () => import('./shipments-form.component').then(m => m.ShipmentsFormComponent) }
];
