import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(
    username: string,
    password: string
  ): Observable<{ username: string; role: string; token: string }> {
    if (username === 'sop1' && password === 'admin') {
      return of({ username, role: 'SOP1', token: 'token-sop1' });
    } else if (username === 'sop2' && password === 'admin') {
      return of({ username, role: 'SOP2', token: 'token-sop2' });
    } else {
      return throwError(() => new Error('Incorrect username or password'));
    }
  }

  logout() {
    // Optionally remove session/token from storage here
  }
}
