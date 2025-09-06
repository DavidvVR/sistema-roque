import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  template: `
  <div class="d-flex justify-content-center align-items-center" style="min-height:80vh">
    <div class="card shadow-sm" style="min-width:380px">
      <div class="card-header">Acceso</div>
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <input class="form-control" [(ngModel)]="user" placeholder="David Vargas R." />
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input class="form-control" type="password" [(ngModel)]="pass" placeholder="••••" />
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button class="btn btn-outline-secondary" (click)="save()">Guardar</button>
          <button class="btn btn-success" (click)="enter()">Entrar</button>
        </div>
        <small class="text-muted d-block mt-2">
          Tip: “Guardar” almacena usuario/contraseña en localStorage.
        </small>
      </div>
    </div>
  </div>
  `
})
export class LoginComponent {
  user = localStorage.getItem('sr_user') ?? '';
  pass = localStorage.getItem('sr_pass') ?? '';

  constructor(private auth: AuthService, private router: Router) {}

  save() {
    localStorage.setItem('sr_user', this.user);
    localStorage.setItem('sr_pass', this.pass);
  }
  enter() {
    if (this.auth.login(this.user, this.pass)) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
