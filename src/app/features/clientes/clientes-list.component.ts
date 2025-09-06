import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes.model';

@Component({
  standalone: true,
  selector: 'app-clientes-list',
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="m-0">Clientes</h2>
      <a class="btn btn-primary" [routerLink]="['/clientes/nuevo']">Nuevo</a>
    </div>

    <div *ngIf="rows.length === 0" class="alert alert-info">
      No hay clientes registrados.
    </div>

    <table *ngIf="rows.length" class="table table-sm table-striped">
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>RFC</th><th>Estatus</th><th>Creado</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of rows">
          <td>{{ c.id }}</td>
          <td>{{ c.nombre }}</td>
          <td>{{ c.rfc || '—' }}</td>
          <td>{{ c.estatus || '—' }}</td>
          <td>{{ c.creadoEn | date:'yyyy-MM-dd HH:mm' }}</td>
          <td class="text-end">
            <a class="btn btn-sm btn-outline-secondary me-2" [routerLink]="['/clientes', c.id]">Editar</a>
            <button class="btn btn-sm btn-outline-danger" (click)="del(c.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  `
})
export class ClientesListComponent implements OnInit, OnDestroy {
  rows: Cliente[] = [];
  private kill$ = new Subject<void>();

  constructor(private svc: ClientesService) {}

  ngOnInit(): void {
    this.svc.list().pipe(takeUntil(this.kill$)).subscribe(list => this.rows = list);
  }
  ngOnDestroy(): void { this.kill$.next(); this.kill$.complete(); }

  del(id: string) {
    if (!confirm('¿Eliminar cliente?')) return;
    this.svc.remove(id).subscribe(() => {
      this.svc.list().subscribe(list => this.rows = list);
    });
  }
}
