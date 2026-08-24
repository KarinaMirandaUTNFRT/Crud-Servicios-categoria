export interface Categoria {
  _id: string;
  nombreCat: string;
  descripcionCat: string;
}

export interface Servicio {
  _id: string;
  nombreServicio: string;
  precio: number;
  imagen: string;
  categoria: Categoria | string;
  descripcion: string;
}

export type ServicioFormData = Omit<Servicio, '_id'>;