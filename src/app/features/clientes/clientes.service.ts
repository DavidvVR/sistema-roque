import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Cliente } from './clientes.model';

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private KEY = 'sr_clientes';

  private read(): Cliente[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  }
  private write(rows: Cliente[]) {
    localStorage.setItem(this.KEY, JSON.stringify(rows));
  }

  list(): Observable<Cliente[]> {
    return of(this.read()).pipe(delay(150));
  }

  byId(id: string): Observable<Cliente|undefined> {
    return this.list().pipe(map(list => list.find(x => x.id === id)));
  }

  upsert(c: Cliente): Observable<Cliente> {
    const rows = this.read();
    const idx = rows.findIndex(x => x.id === c.id);
    if (idx >= 0) rows[idx] = c; else rows.push(c);
    this.write(rows);
    return of(c).pipe(delay(100));
  }

  remove(id: string): Observable<boolean> {
    const rows = this.read().filter(x => x.id !== id);
    this.write(rows);
    return of(true).pipe(delay(100));
  }

  nextId(): string {
    const n = this.read().length + 1;
    return `CLI-${String(n).padStart(4, '0')}`;
  }
}
