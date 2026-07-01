import { createContext, useContext } from "react";
//import type { Servicio, ServicioFormData } from "../interfaces/servicios";

export interface AppContextType {
  usuarioLogueado: boolean;
  setUsuarioLogueado: React.Dispatch<React.SetStateAction<boolean>>;
  // servicios: Servicio[];
  // crearServicio: (nuevoServicio: ServicioFormData) => void;
  // borrarServicio: (idServicio: string) => void;
  // editarServicio: (idServicio: string, servicioEditar: ServicioFormData) => void;
  // buscarServicio: (idServicio: string) => Servicio | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}
