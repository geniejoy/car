import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const consoleApiBasePath = '/services/console';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<string> {
    const promise: Promise<string> = new Promise((resolve, reject) => {
      this.http
        .post(`${consoleApiBasePath}/login`, { username: username, password: password }, { responseType: 'text' })
        .toPromise()
        .then(
          (res: string) => {
            if (res != null) {
              resolve(res);
              console.log(res);
            }
          },
          err => {
            console.log('err' + err);
            reject(err);
          }
        );
    });
    return promise;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
