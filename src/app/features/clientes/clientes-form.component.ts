import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from './clientes.service';
import { Cliente } from './clientes.model';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-clientes-form',
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <h2 class="mb-3">{{ isNew ? 'Nuevo Cliente' : 'Editar Cliente' }}</h2>

    <form [formGroup]="fm" (ngSubmit)="save()" class="card p-3 shadow-sm">
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input class="form-control" formControlName="nombre" required>
      </div>
      <div class="mb-3">
        <label class="form-label">RFC</label>
        <input class="form-control" formControlName="rfc">
      </div>
      <div class="mb-3">
        <label class="form-label">Estatus</label>
        <select class="form-select" formControlName="estatus">
          <option value="">—</option>
          <option>Activo</option>
          <option>Inactivo</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Domicilio</label>
        <textarea class="form-control" rows="2" formControlName="domicilio"></textarea>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-success" type="submit" [disabled]="fm.invalid">Guardar</button>
        <button class="btn btn-outline-secondary" type="button" (click)="back()">Cancelar</button>
      </div>
    </form>
  `
})
export class ClientesFormComponent implements OnInit {
  fm!: FormGroup;
  isNew = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private svc: ClientesService
  ) {}

  ngOnInit(): void {
    // Inicializa el form DESPUÉS de tener fb disponible
    this.fm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      rfc: [''],
      estatus: [''],
      domicilio: [''],
      creadoEn: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = id === 'nuevo' || !id;

    if (this.isNew) {
      this.fm.patchValue({
        id: this.svc.nextId(),
        creadoEn: new Date().toISOString()
      });
    } else {
      this.svc.byId(id!).subscribe(c => {
        if (!c) return this.back();
        this.fm.patchValue(c);
      });
    }
  }

  save() {
    const c = this.fm.value as unknown as Cliente;
    this.svc.upsert(c).subscribe(() => this.router.navigateByUrl('/clientes'));
  }
  back() { this.router.navigateByUrl('/clientes'); }
}
