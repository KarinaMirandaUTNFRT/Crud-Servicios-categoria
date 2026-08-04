// 1. Definimos la interfaz de cómo luce un Servicio en tu app
// Modifica los campos según lo que realmente use tu base de datos
import type { Servicio  } from "../interfaces/servicios";
import type { Usuario } from "../interfaces/usuarios";


const urlServicios = import.meta.env.VITE_SERVICIO+'/servicios';
const urlUsuarios = import.meta.env.VITE_SERVICIO+"/usuarios";


// 2. Tipamos las funciones. 
// Nota: 'fetch' por defecto retorna una Promesa con un objeto 'Response'

export const listarServiciosApi = async (): Promise<Response> => {
    try {
        const respuesta = await fetch(urlServicios);
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error; // Es mejor lanzar el error para que el componente que llama a la API sepa que falló
    }
};

export const crearServicioApi = async (servicio: Servicio): Promise<Response> => {
    try {
        const respuesta = await fetch(urlServicios, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicio)
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const borrarServicioApi = async (id: string | number): Promise<Response> => {
    try {
        const respuesta = await fetch(`${urlServicios}/${id}`, {
            method: 'DELETE',        
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const buscarServicioApi = async (id: string | number): Promise<Response> => {
    try {
        const respuesta = await fetch(`${urlServicios}/${id}`);
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// En el PUT, usamos Partial<Servicio> si solo envías los campos modificados, 
// o directamente 'Servicio' si mandas el objeto completo.
export const editarServicioApi = async ( id: string | number, servicio: Partial<Servicio>): Promise<Response> => {
    try {
        const respuesta = await fetch(`${urlServicios}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicio)
        });
        return respuesta;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

//🆕 consultas para login de usuario
export const loginBackendApi = async (email: string, password: string): Promise<Response> => {
  return fetch(`${urlUsuarios}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
};

export const logoutBackendApi = async (): Promise<Response> => {
  return fetch(`${urlUsuarios}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const obtenerPerfilApi = async (): Promise<Usuario> => {
  const respuesta = await fetch(`${urlUsuarios}/perfil`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el perfil del usuario");
  }

  return respuesta.json();
};
//🆕 Fin consultas para login de usuario