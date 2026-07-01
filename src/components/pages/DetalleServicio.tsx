
import { useParams, useNavigate, Link } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { buscarServicioApi } from "../../helpers/queries";
import type { Servicio } from "../../interfaces/servicios";

const DetalleServicio = () => {
    const { id } = useParams<{ id: string }>();
    // const { buscarServicio } = useAppContext();
    const navigate = useNavigate();
    // 1. Creamos un estado para guardar el servicio una vez que llegue de la API
    const [servicio, setServicio] = useState<Servicio>(null);
    const [cargando, setCargando] = useState<boolean>(true);

      useEffect(() => {
        const obtenerServicio = async () => {
            if (!id) return;
            
            try {
                setCargando(true);
                const respuesta = await buscarServicioApi(id);
                
                if (respuesta && respuesta.ok) {
                    const datos: Servicio = await respuesta.json();
                    setServicio(datos);
                } else {
                    // Si el status es 404 o similar, redirigimos
                    navigate("/404", { replace: true });
                }
            } catch (error) {
                console.error("Error al traer el servicio:", error);
                navigate("/404", { replace: true });
            } finally {
                setCargando(false);
            }
        }
     obtenerServicio();
    }, [id, navigate]);

   // 2. Mientras la API responde, mostramos un estado de carga
    if (cargando) {
        return <div className="text-center text-white mt-8">Cargando detalles del servicio...</div>;
    }

    // 3. Si terminó de cargar pero no hay servicio, evitamos el renderizado
    if (!servicio) {
        return null; 
    }


    return (
        <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-4 text-center">{servicio.nombreServicio}</h2>
            <img
                src={servicio.imagen}
                alt={servicio.nombreServicio}
                className="w-full h-64 object-cover rounded mb-4 border border-zinc-700"
            />
            <p className="text-lg mb-2">
                <span className="font-semibold">Precio:</span> ${servicio.precio.toLocaleString("es-AR")}
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Categoría:</span> {servicio.categoria}
            </p>
            <p className="mb-4">
                <span className="font-semibold">Descripción:</span> {servicio.descripcion}
            </p>
            <Link
                to="/"
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
            >
                Volver
            </Link>
        </div>
    );
};

export default DetalleServicio;