export interface Usuario {
  _id: string;
  nombre: string;
  email: string;
  rol: "Admin" | "Cliente"; // Tipamos estrictamente los roles
}