import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import * as AuthActions from '../../state/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    storeSpy.select.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should not dispatch login if form is invalid', () => {
    component.loginForm.setValue({ username: '', password: '' });
    component.onSubmit();
    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch login action if form is valid', () => {
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    component.onSubmit();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ username: 'user', password: 'pass' })
    );
  });

  it('should select error$ from store', () => {
    expect(component.error$).toBeDefined();
  });
});
