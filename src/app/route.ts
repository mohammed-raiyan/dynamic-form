import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./components/route').then((m) => m.pages_routes),
  },
];
