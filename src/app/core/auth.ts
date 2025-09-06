import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'sr_user';
const PASS_KEY = 'sr_pass';
const AUTH_KEY = 'sr_auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(localStorage.getItem(AUTH_KEY) === '1');
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  saveCredentials(user: string, pass: string) {
    localStorage.setItem(USER_KEY, (user || '').trim());
    localStorage.setItem(PASS_KEY, (pass || '').trim());
  }

  login(user: string, pass: string): boolean {
    const savedU = (localStorage.getItem(USER_KEY) || '').trim();
    const savedP = (localStorage.getItem(PASS_KEY) || '').trim();
    const u = (user || '').trim();
    const p = (pass || '').trim();

    const ok = ((savedU && savedP && u === savedU && p === savedP) || (!savedU && !savedP && !!u && !!p));
    if (ok) {
      localStorage.setItem(AUTH_KEY, '1');
      this._isLoggedIn$.next(true);
    }
    return ok;
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
    this._isLoggedIn$.next(false);
  }
}
