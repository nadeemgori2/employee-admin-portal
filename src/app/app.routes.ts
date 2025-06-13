import { Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee-list/employee-list.component';
import { LoginComponent } from './features/login/login.component';
import { EmployeeDetailComponent } from './features/employee-detail/employee-detail.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'employees/:id',
    loadComponent: () =>
      import('./features/employee-detail/employee-detail.component').then(
        (m) => m.EmployeeDetailComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
