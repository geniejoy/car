import { TestBed, inject } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let authGuard: AuthGuardService;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockSnapshot: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule, RouterTestingModule],
      providers: [AuthGuardService, { provide: Router, useValue: router }]
    });
    mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
  });
  beforeEach(() => {
    authGuard = TestBed.get(AuthGuardService);
  });

  it('canActivate should be true when localStorage have username', () => {
    localStorage.setItem('currentUser', 'John');
    expect(authGuard.canActivate(null, mockSnapshot)).toBe(true);
  });

  it('canActivate should be false when localStorage is null', () => {
    localStorage.removeItem('currentUser');
    expect(authGuard.canActivate(null, mockSnapshot)).toBe(false);
  });
});
