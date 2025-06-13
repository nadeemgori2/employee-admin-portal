import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../../state/auth/auth.selectors';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
