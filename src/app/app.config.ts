import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { employeesReducer } from './state/employees/employees.reducer';
import { EmployeesEffects } from './state/employees/employees.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideStore({ auth: authReducer, employees: employeesReducer }),
    provideEffects([AuthEffects, EmployeesEffects]),
    provideHttpClient(),
  ],
};
