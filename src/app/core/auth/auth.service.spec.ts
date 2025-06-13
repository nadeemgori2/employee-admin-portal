import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login as sop1 with correct credentials', (done) => {
    service.login('sop1', 'admin').subscribe((result) => {
      expect(result).toEqual({
        username: 'sop1',
        role: 'SOP1',
        token: 'token-sop1',
      });
      done();
    });
  });

  it('should login as sop2 with correct credentials', (done) => {
    service.login('sop2', 'admin').subscribe((result) => {
      expect(result).toEqual({
        username: 'sop2',
        role: 'SOP2',
        token: 'token-sop2',
      });
      done();
    });
  });

  it('should throw error for incorrect credentials', (done) => {
    service.login('wrong', 'user').subscribe({
      next: () => fail('Should have errored'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toBe('Incorrect username or password');
        done();
      },
    });
  });

  it('should have a logout method', () => {
    expect(typeof service.logout).toBe('function');
  });
});
