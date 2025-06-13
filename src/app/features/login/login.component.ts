import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthError } from '../../state/auth/auth.selectors';

/**
 * Login Component
 * - Handles user authentication.
 * - Responsive, accessible, and production-ready.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /** Reactive login form */
  loginForm: FormGroup;
  /** Loading state */
  loading = false;
  /** Error observable from store */
  error$ = this.store.select(selectAuthError);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /** Submit login form */
  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
