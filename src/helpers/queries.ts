import type { Servicio, ServicioFormData } from "../interfaces/servicios";
import type { Usuario } from "../interfaces/usuarios";

const urlServicios = import.meta.env.VITE_SERVICIO + "/servicios";
const urlCategorias = import.meta.env.VITE_SERVICIO + "/categorias";
const urlUsuarios = import.meta.env.VITE_SERVICIO + "/usuarios";

export interface ListarServiciosParams {
  paginaNumero?: number;
  cantServicios?: number;
  pagina?: number;
  limite?: number;
  termino?: string;
}

export const listarServiciosApi = async (
  params: ListarServiciosParams = {},
): Promise<Response> => {
  try {
    const query = new URLSearchParams();
    const pagina = params.pagina ?? params.paginaNumero ?? 1;
    const limite = params.limite ?? params.cantServicios ?? 8;
    query.set("pagina", String(pagina));
    query.set("limite", String(limite));
    if (params.termino) {
      query.set("termino", params.termino);
    }

    const respuesta = await fetch(`${urlServicios}?${query.toString()}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listarCategoriasApi = async (): Promise<Response> => {
  try {
    const respuesta = await fetch(urlCategorias);
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const crearServicioApi = async (
  servicio: ServicioFormData,
): Promise<Response> => {
  try {
    const respuesta = await fetch(urlServicios, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servicio),
      credentials: "include",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const borrarServicioApi = async (
  id: string | number,
): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const buscarServicioApi = async (
  id: string | number,
): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editarServicioApi = async (
  id: string | number,
  servicio: Partial<Servicio>,
): Promise<Response> => {
  try {
    const respuesta = await fetch(`${urlServicios}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(servicio),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginBackendApi = async (
  email: string,
  password: string,
): Promise<Response> => {
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
