export interface Cliente {
  id: string;           // e.g., CLI-0001
  nombre: string;
  rfc?: string;
  estatus?: 'Activo'|'Inactivo';
  domicilio?: string;
  creadoEn: string;     // ISO
}
