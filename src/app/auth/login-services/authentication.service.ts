import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs';

const consoleApiBasePath = '/services/console';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<string> {
    const body = new HttpParams()
      .set('infoType', 'login')
      .set('username', username)
      .set('password', Md5.hashStr(password).toString());
    const promise: Promise<string> = new Promise((resolve, reject) => {
      this.http
        .post(`/car/getJson.php`, body, { responseType: 'json' })
        .toPromise()
        .then(
          (res: string) => {
            if (res['userId']) {
              resolve(res['userId']);
            } else {
              reject({ statusText: '驗證錯誤' });
            }
          },
          err => {
            console.error('err' + err);
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
