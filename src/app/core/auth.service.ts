import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private KEY = 'sr_auth';

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.KEY);
  }

  login(user: string, pass: string): boolean {
    if (user?.trim() && pass?.trim()) {
      localStorage.setItem(this.KEY, JSON.stringify({ user }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.KEY);
  }
}
