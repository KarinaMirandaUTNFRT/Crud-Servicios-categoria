export interface Usuario {
  _id: string;
  nombreUsuario: string;
  email: string;
  rol: "Admin" | "Cliente"; // Tipamos estrictamente los roles
}