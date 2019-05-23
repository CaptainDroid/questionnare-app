import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedIn = this.getUser() ? true : false;
  @Output() isloggedInEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient,
              private _router: Router) { }

  public authenticate(user) {
    const endpoint = 'users/authenticate';
    return this._http.post(BASE_URL + endpoint, { username: user.username, password: user.password})
      .pipe(map(data => data));
  }

  public isLoggedIn(): boolean {
    const user: any = this.getUser;
    return (user && user.token) ? true : false;
  }

  public logout() {
    this.setLogInStatus('logout');
  }

  public setLogInStatus(action, user?) {
    if (action === 'login') {
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = true;
    } else if (action === 'logout') {
      localStorage.removeItem('user');
      this.loggedIn = false;
      this._router.navigate(['/login']);
    }
    this.isloggedInEmitter.emit(this.loggedIn);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
    // return user ? JSON.parse(user) : null;
  }
}
