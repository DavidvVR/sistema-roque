import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe],
  template: `
  <div class="d-flex" style="min-height:100vh">
    <aside class="border-end p-3" style="width:260px">
      <h4 class="mb-4">SistemaRoque</h4>
      <nav class="nav flex-column">
        <a routerLink="/dashboard" class="nav-link">Dashboard</a>
        <a routerLink="/clientes" class="nav-link">Clientes</a>
      </nav>
    </aside>
    <main class="flex-fill p-4">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class ShellComponent {}
