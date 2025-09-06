import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-shipments-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Nuevo embarque</h2>
    <form [formGroup]="fm" (ngSubmit)="save()" class="mt-3" style="max-width:520px">
      <mat-form-field class="w-100" appearance="outline">
        <mat-label>Folio</mat-label>
        <input matInput formControlName="folio" required>
      </mat-form-field>
      <mat-form-field class="w-100" appearance="outline">
        <mat-label>Cliente</mat-label>
        <input matInput formControlName="cliente" required>
      </mat-form-field>
      <div class="d-flex gap-3">
        <mat-form-field class="w-100" appearance="outline">
          <mat-label>Origen</mat-label>
          <input matInput formControlName="origen" required>
        </mat-form-field>
        <mat-form-field class="w-100" appearance="outline">
          <mat-label>Destino</mat-label>
          <input matInput formControlName="destino" required>
        </mat-form-field>
      </div>
      <div class="d-flex gap-2 mt-2">
        <button mat-raised-button color="primary" type="submit" [disabled]="fm.invalid">Guardar</button>
        <button mat-stroked-button type="button" (click)="back()">Cancelar</button>
      </div>
    </form>
  `
})
export class ShipmentsFormComponent {
  fm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.fm = this.fb.group({
      folio: ['', Validators.required],
      cliente: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
    });
  }
  save(){ this.router.navigateByUrl('/tms/shipments'); }
  back(){ this.router.navigateByUrl('/tms/shipments'); }
}
