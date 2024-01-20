import { Routes } from '@angular/router';
import { ContainerLayoutComponent } from './container-layout/container-layout.component';

export const pages_routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: ContainerLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'employee-form',
        loadComponent: () =>
          import('./pages/employee-form/employee-form.component').then(
            (m) => m.EmployeeFormComponent
          ),
      },
    ],
  },
];
