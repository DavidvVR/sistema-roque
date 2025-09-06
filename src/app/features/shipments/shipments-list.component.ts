import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

type Shipment = {
  folio: string;
  cliente: string;
  origen: string;
  destino: string;
  estado: 'Planificado' | 'En tránsito' | 'Entregado' | 'Incidencia';
};

@Component({
  standalone: true,
  selector: 'app-shipments-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Embarques</h2>
      <a mat-raised-button color="primary" routerLink="new"><mat-icon>add</mat-icon> Nuevo</a>
    </div>

    <table mat-table [dataSource]="rows" class="mat-elevation-z1" style="width:100%">
      <ng-container matColumnDef="folio">
        <th mat-header-cell *matHeaderCellDef>Folio</th>
        <td mat-cell *matCellDef="let r">{{ r.folio }}</td>
      </ng-container>
      <ng-container matColumnDef="cliente">
        <th mat-header-cell *matHeaderCellDef>Cliente</th>
        <td mat-cell *matCellDef="let r">{{ r.cliente }}</td>
      </ng-container>
      <ng-container matColumnDef="origen">
        <th mat-header-cell *matHeaderCellDef>Origen</th>
        <td mat-cell *matCellDef="let r">{{ r.origen }}</td>
      </ng-container>
      <ng-container matColumnDef="destino">
        <th mat-header-cell *matHeaderCellDef>Destino</th>
        <td mat-cell *matCellDef="let r">{{ r.destino }}</td>
      </ng-container>
      <ng-container matColumnDef="estado">
        <th mat-header-cell *matHeaderCellDef>Estado</th>
        <td mat-cell *matCellDef="let r">{{ r.estado }}</td>
      </ng-container>
      <ng-container matColumnDef="acc">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let r" class="text-end">
          <a mat-stroked-button color="primary" [routerLink]="[r.folio]">Editar</a>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  `
})
export class ShipmentsListComponent {
  cols = ['folio','cliente','origen','destino','estado','acc'];
  rows: Shipment[] = [
    { folio:'SHP-0001', cliente:'ACME', origen:'CDMX', destino:'GDL', estado:'Planificado' },
    { folio:'SHP-0002', cliente:'Globex', origen:'MTY', destino:'QRO', estado:'En tránsito' }
  ];
}
