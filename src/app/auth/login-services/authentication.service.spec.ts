import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService, mockHttp;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['get', 'post']);
  });

  it('login should call api /loginAuth when res != null', async () => {
    mockHttp.post.and.returnValue(observableOf({}));
    authenticationService = new AuthenticationService(mockHttp);
    const res = await authenticationService.login('admin', 'admin');
    expect(mockHttp.post).toHaveBeenCalledWith(
      '/services/console/login',
      { username: 'admin', password: 'admin' },
      { responseType: 'text' }
    );
  });

  it('logout should remove localstorage', () => {
    mockHttp.get.and.returnValue(true);
    authenticationService = new AuthenticationService(mockHttp);
    authenticationService.logout();
    const name = localStorage.getItem('currentUser');
    expect(name).toBeNull();
  });
});
