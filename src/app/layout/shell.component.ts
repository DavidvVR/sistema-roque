import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AuthService } from '../core/auth.service';

// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, NgFor,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatListModule, MatButtonModule, MatDividerModule
  ],
  styles: [`
    .app-container { height: 100vh; }
    .brand { font-weight: 700; letter-spacing: .2px; }
    .content { padding: 24px; }
  `],
  template: `
  <mat-sidenav-container class="app-container">
    <mat-sidenav mode="side" opened>
      <div class="p-4 brand">SistemaRoque</div>
      <mat-divider></mat-divider>
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" routerLinkActive="mdc-list-item--activated">
          <mat-icon>space_dashboard</mat-icon>
          <span class="ms-2">Dashboard</span>
        </a>
        <a mat-list-item routerLink="/clientes" routerLinkActive="mdc-list-item--activated">
          <mat-icon>group</mat-icon>
          <span class="ms-2">Clientes</span>
        </a>
        <a mat-list-item routerLink="/tms/shipments" routerLinkActive="mdc-list-item--activated">
          <mat-icon>local_shipping</mat-icon>
          <span class="ms-2">Embarques</span>
        </a>
        <a mat-list-item routerLink="/tms/orders" routerLinkActive="mdc-list-item--activated">
          <mat-icon>assignment</mat-icon>
          <span class="ms-2">Órdenes</span>
        </a>
        <a mat-list-item routerLink="/tms/drivers" routerLinkActive="mdc-list-item--activated">
          <mat-icon>badge</mat-icon>
          <span class="ms-2">Operadores</span>
        </a>
        <a mat-list-item routerLink="/tms/vehicles" routerLinkActive="mdc-list-item--activated">
          <mat-icon>airport_shuttle</mat-icon>
          <span class="ms-2">Unidades</span>
        </a>
        <a mat-list-item routerLink="/tms/billing" routerLinkActive="mdc-list-item--activated">
          <mat-icon>request_quote</mat-icon>
          <span class="ms-2">Facturación</span>
        </a>
        <a mat-list-item routerLink="/tms/tracking" routerLinkActive="mdc-list-item--activated">
          <mat-icon>my_location</mat-icon>
          <span class="ms-2">Tracking</span>
        </a>
        <a mat-list-item routerLink="/settings" routerLinkActive="mdc-list-item--activated">
          <mat-icon>settings</mat-icon>
          <span class="ms-2">Ajustes</span>
        </a>
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <span class="brand">TMS</span>
        <span style="flex:1"></span>
        <button mat-button (click)="logout()">
          <mat-icon>logout</mat-icon> Salir
        </button>
      </mat-toolbar>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `
})
export class ShellComponent {
  constructor(private auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
